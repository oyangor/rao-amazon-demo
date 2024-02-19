import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //default export when we want to export only one thing//export default (name)

export const deliveryOptions = [{
    id :'1',
    deliveryDays:7,
    priceCents:0
  },{id :'2',
  deliveryDays:3,
  priceCents:499
  },{id :'3',
  deliveryDays:1,
  priceCents:999
  }];


export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option)=>{
  if (option.id === deliveryOptionId) {
    deliveryOption = option;
    //console.log(option.deliveryDays)
  }
  
  });
  return deliveryOption
}
 


export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays
  
  let today = dayjs();

  while (remainingDays > 0) {
    today = today.add(1, 'day');

    if (!isWeekend(today)) {
      remainingDays--;
      // This is a shortcut for:
      // remainingDays = remainingDays - 1;
    }
  }




  const deliveryDate = today.format(
    'dddd, MMMM D'
  );

  return deliveryDate;
}

function isWeekend(today) {

  const formattedDate = today.format('dddd');
  
  return formattedDate === 'Saturday' ||formattedDate ==='Sunday';
}


