import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormNames } from 'src/app/shared/enums/form-names';
import  *  as  currencies  from  'src/assets/currencies.json';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  currencyConverterForm: FormGroup;

  filteredFromCurrencies: Observable<string[]>;
  filteredToCurrencies: Observable<string[]>;

  fromCurrency: string;
  toCurrency: string;

  result: string;
  amount: number;

  isLoading = true;
  formNames = FormNames;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  getAmountForGivenAmount(amountforOne, givenAmount) {
    return amountforOne * givenAmount;
  }
  ngOnInit() {
    const baseCurrency = 'USD';
    const quoteCurrency = 'INR';
    const amount=1;
    this.currencyConverterForm = this.initForm(baseCurrency, quoteCurrency,amount);
    this.convert();
  }

  convert() {
    this.fromCurrency = 
      this.currencyConverterForm.get(FormNames.FromCurrency).value.toUpperCase();
    
    this.toCurrency = 
      this.currencyConverterForm.get(FormNames.ToCurrency).value.toUpperCase();
    this.amount = Math.floor(
      this.currencyConverterForm.get(FormNames.Amount).value
    );

    this.result = this.calculateExchangeRate(
      this.fromCurrency,
      this.toCurrency ,
      this.amount
    );
    console.log(this.result);
  }

  swapCurrencies() {
    this.currencyConverterForm = this.formBuilder.group({
      amount: [
        this.currencyConverterForm.get(FormNames.Amount).value,
        Validators.required
      ],
      fromCurrency: [
        this.currencyConverterForm.get(FormNames.ToCurrency).value,
        Validators.required
      ],
      toCurrency: [
        this.currencyConverterForm.get(FormNames.FromCurrency).value,
        Validators.required
      ]
    });

    const baseCurrencyCode = this.currencyConverterForm.get(
      FormNames.FromCurrency
    ).value;

   
    this.convert();
  }


  convertasPerUSDforOne(curCode: string) {
    
    return currencies['default'][curCode];
  }
  getConvertedAmountForOne(baseCurrencyCode: string,quoteCurrency:string) {
    return this.convertasPerUSDforOne(quoteCurrency)/this.convertasPerUSDforOne(baseCurrencyCode);
  }
  currenciesList= Object.keys(currencies["default"]).sort();
  
  private initForm(fromCurrency: string, toCurrency: string, amount) {
    return this.formBuilder.group({
      amount: [amount, Validators.required],
      fromCurrency: [fromCurrency, Validators.required],
      toCurrency: [toCurrency, Validators.required]
    });
  }

 
  private calculateExchangeRate(baseCurrency:string,quoteCurrency:string,amount:number) {
    var amountforOne=this.getConvertedAmountForOne(baseCurrency,quoteCurrency);
    return (this.getAmountForGivenAmount(amountforOne,amount)).toFixed(5);
  }
}
