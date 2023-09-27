# 1. Setup Projects

- cd api-gateway
- pnpm i
- docker-compose up -d
- pnpm start:dev
- cd users
- pnpm i
- pnpm start:dev
- cd go-lang
- go mod tidy
- go run main.go

To test the projects, plz have a look inside api-gateway folders and request some api that have been defined inside.
