function createDataset(fields, constraints, sortFields) {
  // Assinatura padrão de datasets no Fluig. Os três parâmetros existem
  // apenas para respeitar o contrato esperado pela plataforma:
  // - fields: colunas solicitadas pela consulta
  // - constraints: filtros recebidos na chamada
  // - sortFields: campos pedidos para ordenação
  // Esta implementação não os utiliza, então eles são neutralizados com
  // "void" para deixar explícito que foram ignorados de propósito.
  void fields;
  void constraints;
  void sortFields;

  var ds = DatasetBuilder.newDataset();

  // Três colunas, nesta ordem: codigo, nome e sigla.
  ds.addColumn("codigo");
  ds.addColumn("nome");
  ds.addColumn("sigla");

  // 20 países no formato [codigo ISO-3, nome em português, sigla ISO-2].
  var rows = [
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
    // ["AUS", "Austrália", "AU"],
  ];

  // Adiciona cada país com ds.addRow() usando um laço for clássico.
  for (var i = 0; i < rows.length; i++) {
    ds.addRow(rows[i]);
  }

  return ds;
}
