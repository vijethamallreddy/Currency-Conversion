import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-conversion-details',
  templateUrl: './conversion-details.component.html',
  styleUrls: ['./conversion-details.component.scss']
})
export class ConversionDetailsComponent implements OnChanges {
  @Input() amount: number;
  @Input() result: number;

  @Input() fromCurrencyRate: number;
  @Input() toCurrencyRate: number;

  @Input() fromCurrency: string;
  @Input() toCurrency: string;

  toRate: number;
  fromRate: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.fromCurrency = this.fromCurrency ;
    this.fromRate = this.fromCurrencyRate;
    this.toCurrency = this.toCurrency ;
    this.toRate =this.toCurrencyRate;
  }
}
