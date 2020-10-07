import Vue from 'vue';


Vue.directive('money-format', (el, {
  value
}) => {
  el.innerHTML = new Intl.NumberFormat('pt-BR', {
    currency: "BRL", // formato de moeda brasileira
    style: "currency", // moeda
    minimumFractionDigits: 2 // total de casas decimais
  }).format(value || 0) // passagem do parametro ou valor default 0
})
