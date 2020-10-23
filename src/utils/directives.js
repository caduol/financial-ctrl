import Vue from 'vue';
import moment from 'moment'


Vue.directive('money-format', (el, {
  value
}) => {
  el.innerHTML = new Intl.NumberFormat('pt-BR', {
    currency: "BRL", // formato de moeda brasileira
    style: "currency", // moeda
    minimumFractionDigits: 2 // total de casas decimais
  }).format(value || 0) // passagem do parametro ou valor default 0
})


Vue.directive('date-formate',(el,{ value })=>{
  el.innerHTML = moment(value).format('DD/MM/YYYY [às] HH:mm:ss')
})
