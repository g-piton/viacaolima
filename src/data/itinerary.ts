export const itinerary = {
  outbound: {
    label: "Saída",
    route: "Origem x Destino",
    stops: [
      { time: "A combinar", place: "Origem", detail: "Saída conforme contrato" },
      { time: "Sob consulta", place: "Paradas", detail: "Pontos intermediários definidos no roteiro" },
      { time: "Previsto", place: "Destino", detail: "Chegada planejada conforme distância e operação" }
    ]
  },
  inbound: {
    label: "Retorno",
    route: "Destino x Origem",
    stops: [
      { time: "A combinar", place: "Destino", detail: "Retorno conforme programação" },
      { time: "Sob consulta", place: "Paradas", detail: "Pontos intermediários definidos no roteiro" },
      { time: "Previsto", place: "Origem", detail: "Chegada planejada conforme distância e operação" }
    ]
  }
};
