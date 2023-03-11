module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: 'packages/*/tsconfig.json',
			},
			node: true,
		},
	},
	rules: {
		'padded-blocks': ['error', { classes: 'always' }],
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		'no-console': 'error',
		'import/no-unresolved': 'error',
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					['parent', 'sibling', 'index', 'object'],
					'type',
				],
				pathGroups: [
					{
						pattern: '**/type',
						group: 'type',
					},
					{
						pattern: './*.module.scss',
						group: 'type',
						position: 'after',
					},
				],
				distinctGroup: false,
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				'newlines-between': 'always',
			},
		],
		'@typescript-eslint/consistent-type-imports': 'error', // force use import type when import a var just use it's type
		'@typescript-eslint/explicit-function-return-type': [
			'error',
			{
				allowTypedFunctionExpressions: true,
			},
		],
	},
}
