import { firstValueFrom } from 'rxjs';
import { horizonUrl$ } from '../state/store';
import { ITransaction, ITransactionResponse } from '../types';

export async function fetchAccountBalance(pk: string): Promise<string> {
  const horizonUrl: string | undefined = await firstValueFrom(horizonUrl$);
  if (!horizonUrl) {
    throw new Error('There is no Horizon URL set');
  }
  const url: URL = new URL(horizonUrl);
  url.pathname = `/accounts/${pk}`;
  const response: Response = await fetch(url);
  const data = await response.json();
  const nativeBalance = data.balances.find((b: { asset_type: string }): boolean => b.asset_type === 'native');
  return nativeBalance.balance;
}

export async function fetchAccountTransactions(pk: string, limit: number = 5): Promise<ITransaction[]> {
  const horizonUrl: string | undefined = await firstValueFrom(horizonUrl$);
  if (!horizonUrl) {
    throw new Error('There is no Horizon URL set');
  }
  
  const url: URL = new URL(horizonUrl);
  url.pathname = `/accounts/${pk}/transactions`;
  url.searchParams.set('limit', limit.toString());
  url.searchParams.set('order', 'desc');
  
  const response: Response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.statusText}`);
  }
  
  const data: ITransactionResponse = await response.json();
  return data._embedded.records;
}
