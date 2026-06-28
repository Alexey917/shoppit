import { CheckoutProducts } from '@/modules';
import { PaymentOptions } from '@/components';

import classes from './CheckoutPage.module.css';

export const CheckoutPage = () => {
  return (
    <main>
      <div className={classes.wrapper}>
        <CheckoutProducts />
        <PaymentOptions />
      </div>
    </main>
  );
};
