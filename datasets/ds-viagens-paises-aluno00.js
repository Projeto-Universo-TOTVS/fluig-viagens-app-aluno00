/**
 * Dataset customizado: ds-viagens-paises-aluno00
 * Retorna uma lista fixa de 20 países no formato [codigo ISO-3, nome em português, sigla ISO-2].
 * Código server-side executado no motor Rhino (ES5).
 */
function createDataset(fields, constraints, sortFields) {
  var dataset = DatasetBuilder.newDataset();

  try {
    // Colunas na ordem exigida: codigo, nome, sigla
    dataset.addColumn("codigo");
    dataset.addColumn("nome");
    dataset.addColumn("sigla");

    var paises = [
      ["BRA", "Brasil", "BR"],
      ["USA", "Estados Unidos", "US"],
      ["ARG", "Argentina", "AR"],
      ["CHL", "Chile", "CL"],
      ["URY", "Uruguai", "UY"],
      ["PRY", "Paraguai", "PY"],
      ["BOL", "Bolívia", "BO"],
      ["PER", "Peru", "PE"],
      ["COL", "Colômbia", "CO"],
      ["VEN", "Venezuela", "VE"],
      ["MEX", "México", "MX"],
      ["DEU", "Alemanha", "DE"],
      ["ESP", "Espanha", "ES"],
      ["PRT", "Portugal", "PT"],
      ["FRA", "França", "FR"],
      ["ITA", "Itália", "IT"],
      ["GBR", "Reino Unido", "GB"],
      ["JPN", "Japão", "JP"],
      ["CHN", "China", "CN"],
      ["AUS", "Austrália", "AU"]
    ];

    for (var i = 0; i < paises.length; i++) {
      dataset.addRow(paises[i]);
    }
  } catch (e) {
    // Erro retornado como dado para o consumidor receber um resultado previsível
    dataset = DatasetBuilder.newDataset();
    dataset.addColumn("ERROR");
    dataset.addRow([String(e)]);
  }

  return dataset;
}
