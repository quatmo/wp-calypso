/** @format */
/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import checkoutController from './controller';
import SiftScience from 'lib/siftscience';
import userFactory from 'lib/user';
import { makeLayout, render as clientRender, viaLogin } from 'controller';
import { noSite, siteSelection } from 'my-sites/controller';

export default function() {
	const user = userFactory();
	const isLoggedIn = !! user.get();

	SiftScience.recordUser();

	if ( isLoggedIn ) {
		page(
			'/checkout/thank-you/no-site/:receiptId?',
			noSite,
			checkoutController.checkoutThankYou,
			makeLayout,
			clientRender
		);

		page(
			'/checkout/thank-you/:site/:receiptId?',
			siteSelection,
			checkoutController.checkoutThankYou,
			makeLayout,
			clientRender
		);

		page(
			'/checkout/thank-you/:site/:receiptId/with-gsuite/:gsuiteReceiptId',
			siteSelection,
			checkoutController.checkoutThankYou,
			makeLayout,
			clientRender
		);

		page(
			'/checkout/thank-you/features/:feature/:site/:receiptId?',
			siteSelection,
			checkoutController.checkoutThankYou,
			makeLayout,
			clientRender
		);
	}

	page(
		'/checkout/features/:feature/:domain/:plan_name?',
		viaLogin,
		siteSelection,
		checkoutController.checkout,
		makeLayout,
		clientRender
	);

	page(
		'/checkout/no-site',
		viaLogin,
		noSite,
		checkoutController.sitelessCheckout,
		makeLayout,
		clientRender
	);

	page(
		'/checkout/:domain/:product?',
		viaLogin,
		siteSelection,
		checkoutController.checkout,
		makeLayout,
		clientRender
	);

	page(
		'/checkout/:product/renew/:purchaseId/:domain',
		viaLogin,
		siteSelection,
		checkoutController.checkout,
		makeLayout,
		clientRender
	);

	page(
		'/checkout/:site/with-gsuite/:domain/:receiptId?',
		viaLogin,
		siteSelection,
		checkoutController.gsuiteNudge,
		makeLayout,
		clientRender
	);

	// Visting /checkout without a plan or product should be redirected to /plans
	page( '/checkout', '/plans' );
}
