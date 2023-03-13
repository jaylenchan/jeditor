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
		'plugin:import/typescript',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'unused-imports'],
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
		'no-console': 'error',
		'padded-blocks': ['error', { classes: 'always' }],
		'import/newline-after-import': ['error', { count: 2 }],
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
				],
				distinctGroup: false,
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				'newlines-between': 'always',
			},
		],
		'@typescript-eslint/member-ordering': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/explicit-function-return-type': [
			'error',
			{
				allowTypedFunctionExpressions: true,
			},
		],
		'@typescript-eslint/no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'error',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],
		'lines-between-class-members': [
			'error',
			'always',
			{ exceptAfterSingleLine: true },
		],
		'@typescript-eslint/naming-convention': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/explicit-member-accessibility': [
					'error',
					{
						accessibility: 'explicit',
						overrides: {
							accessors: 'explicit',
							constructors: 'no-public',
							methods: 'explicit',
							properties: 'explicit',
							parameterProperties: 'explicit',
						},
					},
				],
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: 'memberLike',
						modifiers: ['public'],
						format: ['camelCase', 'PascalCase'],
						leadingUnderscore: 'forbid',
						filter: {
							regex: '^(-webkit)',
							match: false,
						},
					},
					{
						selector: 'memberLike',
						modifiers: ['protected'],
						format: ['camelCase', 'PascalCase'],
						leadingUnderscore: 'require',
					},
					{
						selector: 'memberLike',
						modifiers: ['private'],
						format: ['camelCase', 'PascalCase'],
						leadingUnderscore: 'require',
					},
					{
						selector: 'typeLike',
						format: ['PascalCase'],
					},
				],
			},
		},
	],
}
