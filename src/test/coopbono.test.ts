import { describe, expect, it } from 'vitest';
import { budgetTotal, scoreTotal, remainingBalance, initialReceipts, cooperative } from '@/lib/mockData';

describe('CoopBono demo calculations', () => {
  it('sums editable quantities and unit prices', () => {
    const items = [{ id: 1, name: 'Semillas', quantity: 10, price: 12500 }, { id: 2, name: 'Herramientas', quantity: 6, price: 30000 }];
    expect(budgetTotal(items)).toBe(305000);
    expect(budgetTotal(items.map(item => item.id === 1 ? {...item,quantity:12} : item))).toBe(330000);
  });
  it('recalculates four rubric criteria with sliders between 1 and 10', () => {
    expect(scoreTotal([1,1,1,1])).toBe(10);
    expect(scoreTotal([10,10,10,10])).toBe(100);
    expect(scoreTotal([9,8,9,8])).toBe(85);
    expect(scoreTotal([0,11,10,10])).toBe(78);
  });
  it('only subtracts approved receipts from the awarded balance', () => {
    expect(remainingBalance(cooperative.awarded, initialReceipts)).toBe(725000);
    expect(remainingBalance(850000,[...initialReceipts,{amount:50000,status:'En revisión'}])).toBe(725000);
    expect(remainingBalance(850000,[...initialReceipts,{amount:50000,status:'Aprobado'}])).toBe(675000);
  });
});