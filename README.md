<h1 align="center">Backend-challenge-mks</h1>

# Tabela de conteúdo

<!--ts-->
 - [Sobre](#Sobre)
 - [Integrantes](#Integrantes)
 - [Aplicação](#Aplicação)
 - [Rotas](#Rotas)
    - [GET](#GET)
    - [POST](#POST)
    - [PATCH](#PATCH)
    - [DELETE](DELETE)
<!--te-->

<br>

# Sobre

- Esta é uma aplicação onde o usuário pode se cadastrar e criar filmes no banco de dados.
  <br>

# Integrantes

- <a href="https://github.com/LorenzoMarques">Lorenzo Marques.</a> <br>
  <br>

# Aplicação

url base da aplicação no heroku: https://backend-challenge-mks.herokuapp.com/api

# Rotas

# <p align="center">GET</p>

1.1 - Para listar todos os usuários, utilize a a rota: <br>
`GET /users - formato de resposta - status 200`

```json
[
	{
		"id": 3,
		"username": "username2",
		"name": "teste"
	},
	{
		"id": 1,
		"username": "updated",
		"name": "123"
	}
]
```

1.2 - Para ler os dados de um usuário especifico, utilize a rota:<br>
`GET /users/<user_id> - formato de resposta - status 200`

```json
	{
		"id": 3,
		"username": "username2",
		"name": "teste"
	}
```


1.3 - Para fazer uma listagem de todos os filmes, utilize a rota:<br>
`GET /movies - formato de resposta - 200`

```json
[
	{
		"id": 2,
		"name": "beibe",
		"genre": "aventura",
		"userId": 3
	},
	{
		"id": 3,
		"name": "Harry potter",
		"genre": "ação",
		"userId": 2
	}
]
```

1.4 - Para ler os dados de um filme especifico, utilize a rota:<br>
`GET /movies/<movie_id> - formato de resposta - 200`

```json
	{
		"id": 3,
		"name": "Harry potter",
		"genre": "ação",
		"userId": 2
	}
```


# <p align="center">POST</p>

2.1 - Para criar uma conta de usuario, utilize a rota:<br>
`POST /users - formato de requisição`

```json
{
  "name": "andre",
  "username": "andrerodriguessil",
  "password": "admin123",
}
```

`POST /users - formato de resposta - 201`

```json
{
  "name": "andre",
  "username": "andrerodriguessil",
	"id": 4
}
```

2.2 - Para fazer login em uma conta, utilize a rota:<br>
`POST /auth/login - formato de requisição`

```json
{
  "username": "andrerodriguess",
  "password": "admin123"
}
```

`POST /auth/login - formato de resposta - 200`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJlcm9kcmlndWVzc2lsQGdtYWlsLmNvbSIsImlhdCI6MTY1MzYyMDIwOSwiZXhwIjoxNjUzNzA2NjA5fQ.fPnervTSxD4JvoTpgvitV23GDhy328iH9zHKb-eCS0w"
}
```

2.3 - Para criar criar um filme, utilize a rota:<br>
Atenção! É necessário ter um token de autorização para acessar essa rota:<br>

`POST /movies - formato de requisição`

```json
{
		"name": "Harry potter",
		"genre": "outros"
}
```

`POST /movies - formato de resposta - 201`

```json
{
	"name": "Harry potter",
	"genre": "outros",
	"user": {
		"id": 3,
		"username": "username2",
		"name": "teste"
	},
	"userId": 3,
	"id": 3
}
```

# <p align="center">PATCH</p>

3.1 - Para atualizar os dados de um usuario, utilize a rota:<br>
Atenção! É necessário ter um token de autorização para acessar essa rota.<br>
`PATCH /users/<user_id> formato de requisição`

```json
{
  "username": "rodrigues_andre",
  "name": "André Rodrigues",
  "password": "@andreAdmin"
}
```

`PATCH /users/<user_id> - formato de resposta - 200`

```json
{
	"id": 1,
  "username": "rodrigues_andre",
  "name": "André Rodrigues",
}
```

3.2 - Para atualizar os dados de uma musica, utilize a rota:<br>
Atenção! É necessário ter um token de autorização para acessar essa rota.<br>
`PATCH /movies/<movie_id>> formato de requisição`

```json
{
		"name": "updated",
		"genre": "updated"
}
```

`PATCH /movies/<movie_id>/ - formato de resposta - 200`

```json
{
	"id": 2,
	"name": "updated",
	"genre": "updated",
	"userId": 3
}
```



# <p align="center">DELETE</p>

4.1 - Para deletar um filme, utilize a rota:<br>
Atenção! É necessário ter um token de autorização para acessar essa rota.<br>
`DELETE /musics/<music_id> - formato de resposta - 200`

```json
{
	"raw": [],
	"affected": 0
}
```

4.2 - Para deletar um usuario, utilize a rota:<br>
Atenção! É necessário ter um token de autorização para acessar essa rota.<br>
`DELETE /users/<user_id> - formato de resposta - 200`

```json
{
	"raw": [],
	"affected": 1
}
```

