import { formatCurrency } from "../scripts/utils/money.js";

describe('test suite:formartgurrency',()=>{
  it('covert cents to dollars',()=>{
    expect(formatCurrency(2095)).toEqual('20.95')
  })
})