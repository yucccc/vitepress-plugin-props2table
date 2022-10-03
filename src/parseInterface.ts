import { parse } from '@babel/parser'
import type { ParserPlugin, ParseResult } from '@babel/parser'
import { visit, ASTNode } from 'ast-types'
import { get, isArray } from 'lodash-es'

const defaultParserPlugin: ParserPlugin[] = ["typescript"]

export function parseCode(code: string, plugins: ParserPlugin[] = []): ParseResult<any> {
    return parse(code, {
        sourceType: "module",
        plugins: defaultParserPlugin.concat(plugins),
    });
}

function findInterfaces(node: ASTNode) {
    let ret = Object.create(null);
    visit(node, {
        visitTSInterfaceDeclaration(nodePath) {
            // 只有导出的interface才会被解析
            if (nodePath.parentPath.value.type === 'ExportNamedDeclaration') {
                ret[nodePath.value.id.name] = nodePath.value.body.body
            }
            this.traverse(nodePath)
        },
    });
    return ret;
}

// function parseTSTypeReference(typeName) {
//     const type = get(typeName, "type");

//     switch (type) {
//         case "TSQualifiedName":
//             return `${get(typeName, "left.name")}.${get(typeName, "right.name")}`;
//         default:
//             return `Unknown ReferenceType`;
//     }
// }

function parseTSFunctionType(parameters: any[], typeAnnotation: any) {
    const parseTSFunctionParameters = (parameters: any[]) => {
        if (!parameters || !parameters.length) {
            return `()`;
        }
        let args = parameters.map((parameter) => {
            return `${get(parameter, "name")}${parameter.optional ? '?' : ''}: ${parseTypeAnnotation(
                get(parameter, "typeAnnotation.typeAnnotation")
            )}`;
        });
        return "(" + args.join(", ") + ")";
    };
    return `${parseTSFunctionParameters(parameters)} => ${parseTypeAnnotation(typeAnnotation)}`;
}

function parseTSTypeLiteral(members: any[]) {
    const ret = parseInterfaceDefinitions(members);
    let args = ret.map((t) => `${t.name}: ${t.type}`);
    return "{" + args.join(", ") + "}";
}
function parseTSArrayType(type: string | string[]) {
    return isArray(type) ? `(${type.join(' | ')})[]` : `${type}[]`
}

function parseTSLiteralType(Node: Node) {
    return get(Node, "literal.value")
}

function parseTypeAnnotation(typeAnnotation: any): any {
    const type = get(typeAnnotation, "type");

    switch (type) {
        case "TSNumberKeyword":
        case "TSStringKeyword":
        case "TSBooleanKeyword":
        case "TSNullKeyword":
        case "TSUndefinedKeyword":
        case "TSSymbolKeyword":
        case "TSAnyKeyword":
        case "TSVoidKeyword":
        case "TSNeverKeyword":
        case "TSUnknownKeyword":
            return type.match(/TS(\w+)Keyword/)[1].toLowerCase();
        case "TSLiteralType":
            return parseTSLiteralType(typeAnnotation)
        case "TSArrayType":
            return parseTSArrayType(
                parseTypeAnnotation(
                    get(typeAnnotation, "elementType")
                )
            )
        case "TSUnionType":
            return get(typeAnnotation, "types", [])
                .map((node: any) => parseTypeAnnotation(node))
                .join(' | ')
        case "TSFunctionType":
            const parameters = get(typeAnnotation, "parameters")
            return parseTSFunctionType(
                parameters,
                get(typeAnnotation, "typeAnnotation.typeAnnotation")
            );

        case "TSTypeReference":
            const typeName = get(typeAnnotation, "typeName.name")
            const typeParameters = get(typeAnnotation, "typeParameters.params", []).map(parseTypeAnnotation)
            return `${typeName}${typeParameters.length ?
                `<${typeParameters.join(', ')}>`
                : typeParameters
                }`
        case "TSTypeLiteral":
            return parseTSTypeLiteral(get(typeAnnotation, "members"));
        // (any)[]
        case "TSParenthesizedType":
            return `(${parseTypeAnnotation(get(typeAnnotation, 'typeAnnotation'))})`
        default:
            return type;
    }
}
// 一行注释默认都解析为description 在有Jsdoc的情况下会被覆盖
function parseLineBlock() {

}
/**
 * 把多行注释解析为对象
 * @description 一行注释
 */
// 解析jsdoc @作为key value的注释
const jsDocReg = /@(\w+)\s+(.+)/

function parseCommentBlock(jsDoc: string) {
    /**
     * 不使用matchAll 因为解析无法区分带@和不带@的情况
     */
    return jsDoc.replaceAll(/[\/\*]/g, '').split('\n').reduce((a, line) => {

        if (line.includes('@')) {
            const match = jsDocReg.exec(line)
            if (match) {
                a[match[1]] = match[2]
            }
        } else {
            // 匹配任意不为空的字符
            const match = /\S+/.exec(line)
            if (match) {
                a['description'] = match[0]
            }
        }

        return a
    }, Object.create(null))
}
function parseComments(comments: any) {
    return comments.reduce((a: any, c: any) => {
        const comment = parseCommentBlock(c.value)
        return Object.assign(a, comment)
    }, Object.create(null))
}
function parseInterfaceDefinitions(nodePaths: any): any[] {
    const parseInterfaceDefinitionsNode = (nodePath: any) => {
        const name = get(nodePath, "key.name");
        const required = !get(nodePath, "optional")
        const comments = parseComments(get(nodePath, "leadingComments", []))
        const typeAnnotation = get(nodePath, "typeAnnotation.typeAnnotation");
        const type = parseTypeAnnotation(typeAnnotation);
        return { name, type, comments, required };
    };

    return nodePaths.map(parseInterfaceDefinitionsNode);
}

type CommentType = 'description' | 'default' | 'options'

export interface InterfaceDefinition {
    name: string;
    type: string;
    required: boolean;
    comments: Record<CommentType | string, string>
}

export function parseInterface(code: string, parsePlugins?: ParserPlugin[]): Record<string, InterfaceDefinition[]> {

    const ast = parseCode(code, parsePlugins);

    const interfaces = findInterfaces(ast);

    const definitions = Object.keys(interfaces).reduce((a, c) => {
        a[c] = parseInterfaceDefinitions(interfaces[c])
        return a;
    }, Object.create(null));

    return definitions;
}

