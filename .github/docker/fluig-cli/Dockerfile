# Imagem base: Node.js 22 sobre Debian "bookworm" na variante "slim".
# A versão slim remove pacotes extras do sistema para gerar uma imagem menor,
# mantendo o runtime do Node necessário para rodar os scripts de deploy.
FROM node:22-bookworm-slim

# Diretório de trabalho padrão dentro do container.
# Todos os comandos seguintes (COPY, RUN, CMD) assumem este caminho como base.
WORKDIR /workspace

# Argumento preenchido automaticamente pelo Docker/buildx durante o build.
# Indica a arquitetura de destino da imagem (ex.: amd64, arm64) e é usado
# abaixo para escolher o binário correto da Fluig CLI.
ARG TARGETARCH

# Copia a distribuição "standalone" da Fluig CLI (que contém os binários
# pré-compilados para cada arquitetura) para um diretório temporário na imagem.
COPY .tools/fluig-studio-cli-v0.1.0-mvp.4/standalone /tmp/fluig-standalone

# Seleciona e instala o binário da CLI de acordo com a arquitetura:
# - amd64: copia o executável linux-x64 para /usr/local/bin/fluig
#          (que está no PATH, permitindo chamar apenas "fluig").
# - qualquer outra arquitetura: aborta o build com erro, pois esta imagem
#          só oferece suporte a amd64.
# Ao final, concede permissão de execução ao binário instalado.
RUN case "${TARGETARCH}" in \
    "amd64") cp /tmp/fluig-standalone/fluig-cli-linux-x64 /usr/local/bin/fluig ;; \
    *) echo "Arquitetura suportada apenas para esta imagem: amd64. Recebido: ${TARGETARCH}" && exit 1 ;; \
  esac \
  && chmod +x /usr/local/bin/fluig

# Comando padrão executado quando o container inicia:
# roda o script Node responsável por publicar (deploy) os recursos no Fluig.
CMD ["node", ".github/scripts/fluig-resource-deploy.mjs"]
