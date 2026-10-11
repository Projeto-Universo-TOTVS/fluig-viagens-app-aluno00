#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";

const workspace = process.cwd();
const cliPath = process.env.FLUIG_CLI_PATH || "/usr/local/bin/fluig";

// Orquestra o fluxo completo de deploy:
// lê a configuração, resolve os datasets-alvo, autentica no Fluig CLI
// e publica cada recurso selecionado.
async function main() {
  const config = await readConfig();
  const datasets = await resolveDatasets();

  if (datasets.length === 0) {
    console.log("Nenhum dataset para deploy.");
    return;
  }

  const connection = getConnection(config);

  console.log(`Datasets selecionados: ${datasets.length}`);
  for (const dataset of datasets) {
    console.log(`- ${dataset}`);
  }

  // ---------------------------------------------------------------------------
  //  CHAMADAS DE COMANDO DO FLUIG CLI
  // ---------------------------------------------------------------------------

  // Cole aqui

  // ---------------------------------------------------------------------------
  //  FIM CHAMADAS DE COMANDO DO FLUIG CLI
  // ---------------------------------------------------------------------------

}
  
// Lê a configuração mínima do projeto usada para montar o nome do servidor
// e outros parâmetros auxiliares do deploy.
async function readConfig() {
  const file = await readFile(path.join(workspace, "fluig.json"), "utf8");
  return JSON.parse(file);
}

// Monta os dados de conexão a partir das variáveis de ambiente do CI
// e normaliza host, porta, SSL e nome do servidor.

// ---------------------------------------------------------------------------
//  METODO GET CONNECTION
// ---------------------------------------------------------------------------

// Cole aqui

// ---------------------------------------------------------------------------
//  FIM METODO GET CONNECTION
// ---------------------------------------------------------------------------

// Permite que o pipeline faça deploy seletivo quando FLUIG_DATASET_PATHS
// estiver preenchido; caso contrário, publica todos os datasets do projeto.
async function resolveDatasets() {
  const selected = splitDatasetList(process.env.FLUIG_DATASET_PATHS || "");
  if (selected.length > 0) {
    return selected.sort();
  }

  return listDatasets(path.join(workspace, "datasets"));
}

// Varre recursivamente a pasta datasets e devolve caminhos relativos,
// que são os formatos esperados pelo restante do script.

// ---------------------------------------------------------------------------
//  LISTAGEM DE DATASET
// ---------------------------------------------------------------------------

// Cole aqui

// ---------------------------------------------------------------------------
//  FIM LISTAGEM DE DATASET
// ---------------------------------------------------------------------------

// Aceita lista manual separada por quebra de linha ou vírgula,
// mantendo apenas caminhos válidos de datasets JavaScript.
function splitDatasetList(value) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter((item) => item.startsWith("datasets/") && item.endsWith(".js"));
}

// Normaliza o nome do servidor para evitar caracteres inválidos
// quando o identificador vier do projeto ou do ambiente do CI.
function sanitize(value) {
  return (
    String(value)
      .trim()
      .replace(/[^a-zA-Z0-9._-]+/g, "-") || "fluig-ci"
  );
}

// Encapsula a execução do binário do Fluig CLI para manter
// o tratamento de erro centralizado em um único ponto.
async function runCli(args) {
  await new Promise((resolve, reject) => {
    const child = spawn(cliPath, args, {
      cwd: workspace,
      stdio: "inherit",
      env: process.env,
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Comando falhou com codigo ${code}.`));
    });
  });
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
