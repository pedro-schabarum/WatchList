# 1. Desinstalar o Expo CLI

Rodar o comando `npm uninstall -g expo-cli`. Depois de rodar o comando, é uma boa prática verificar se o Expo foi realmente removido, executando: `expo --version`. Se o Expo foi removido corretamente, esse comando retornará algo como command not found ou uma mensagem de erro.

# 2. Limpar o Cache do NPM (opcional, mas recomendado)

Em alguns casos, pode ser necessário limpar o cache do npm para evitar problemas de versões antigas de pacotes, especialmente se você tiver encontrado problemas com dependências corrompidas Execute o seguinte comando para limpar o cache do npm: `npm cache clean --force`.

# 3. Reinstalar o Expo CLI

Agora, para instalar novamente o Expo CLI, basta rodar o seguinte comando: `npm install -g expo-cli`

# 4. Verificar a Instalação

Para verificar se o Expo foi instalado corretamente, execute: `expo --version`.

# 5. Rodar o Projeto Novamente

- Navegue até a pasta do seu projeto: `cd /caminho/para/seu/projeto`
- Se necessário, instale as dependências do projeto: `npm install`
- Rodar o projeto: `expo start`

![Diagrama do banco local](https://www.planttext.com/api/plantuml/png/hPDDRu9048Rl9Fo7hQVsOBmJGaIbBGbgOw3NPcHNEodialr8DDh_tlKRHKsRbEFCmplllhFRLHgaDcNXEgxpGDaCEIELn1BaykEBBHyNJyIV1hu95dx717vd6foucP0Cv_p8xQ6D5ECQzP9aYacoSXrYlxegqYUFnACqUeackow7addaFPpqNyDzYPM0nKLDCVu95pMaAChBuaneySRahA50GGC7bNja4APH6W-ZlR86RLHVS6sbUkDn4eKZCeYUmon9IJh9ph14p97VmpPJ-X8X1r4Vz5tBnbehcGgLGgMH2lMxdEgP5_PFY1k8nafipi4C5LSE7_EyCEgsBxioFFc2__Er5OwfHqRPi7SeiWgLi0jiD3GhAo61mcK33eaTyp_tdsoc_zqqqamPa2ZkGuTWcw5hKroB-zOjs3wDzRhT5gkTPO-qSiksNATnConcgZfemx5SOrCtk2xZTFl4Vm00)

# segundo código

```mermaid
graph TD
    @startuml

!define primary_key(x) <b><u>x</u></b>
!define foreign_key(x) <u>x</u>

entity User {
    primary_key(id): INTEGER
    name: VARCHAR
    email: VARCHAR
    senha: VARCHAR
    idioma: VARCHAR
    fotoPerfil: VARCHAR
    datanasc: DATETIME
    statusConta: BOOLEAN DEFAULT TRUE
    statusLogin: BOOLEAN DEFAULT TRUE
    dataCriacao: DATETIME
}

entity filmesAssistidos {
    primary_key(id): INTEGER
    foreign_key(listaId): INTEGER
    tipoConteudo: VARCHAR
    dataInclusao: DATETIME
}

entity seriesAssistidas {
    primary_key(id): INTEGER
    foreign_key(listaId): INTEGER
    serieId: NUMBER
    episodioeId: NUMBER
    temporadaId: NUMBER
    assistido: BOOLEAN
}

entity Lista {
    primary_key(id): INTEGER
    foreign_key(idUsuario): INTEGER
    foreign_key(idConteudo): INTEGER
    titulo: VARCHAR
    dataCriacao: DATETIME
}

User ||--o{ Lista: "cria"
filmesAssistidos ||-up-o{ Lista: "tem"
seriesAssistidas ||-up-o{ Lista: "tem"
@enduml

```
