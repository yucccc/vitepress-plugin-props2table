import { parseInterface } from '../src/parseInterface';
import { test, expect } from 'vitest'
import { join } from 'node:path'

test('parseInterface get one no jsdoc', () => {

    const data = parseInterface(join(__dirname, './props.ts'), 'T2')
    expect(data).toEqual({
        "T2": [
            {
                name: 'name',
                type: 'string',
                sourceType: {
                    type: 'string'
                },
                description: undefined,
                defaultValue: undefined,
                OptionalValue: undefined,
                required: true
            },
            {
                name: 'age',
                type: 'number',
                sourceType: {
                    type: 'number'
                },
                description: undefined,
                defaultValue: undefined,
                OptionalValue: undefined,
                required: true
            },
            {
                name: 'sex',
                type: '男 | 女',
                sourceType: {
                    type: 'union',
                    types:  [ "男", "女"],
                },
                description: undefined,
                defaultValue: undefined,
                OptionalValue: undefined,
                required: true
            },
            {
                name: 'eat',
                type: '(food:string) => void',
                sourceType: {
                    parameters: [
                        [ 'food', 'string' ]
                    ],
                    type: 'function',
                    "returnType": "void",
                },
                description: undefined,
                defaultValue: undefined,
                OptionalValue: undefined,
                required: true
            },
        ]
    })

})

test('parseInterface get one with jsdoc', () => {
    const data2 = parseInterface(join(__dirname, './props.ts'), 'T3')
    expect(data2).toEqual({
        "T3": [
            {
                name: 'name',
                type: 'string',
                sourceType: {
                    type: 'string'
                },
                description: undefined,
                defaultValue: 'yuc',
                OptionalValue: undefined,
                required: true
            },
            {
                name: 'age',
                type: 'number',
                sourceType: {
                    type: 'number'
                },
                description: '年龄',
                defaultValue: undefined,
                OptionalValue: undefined,
                required: true
            },

        ]
    })
})

