<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
	/**
	 * View the product form.
	 *
	 * @param Request
	 * @return Response
	 */
	public function form(Request $request)
	{
		return view('product_form');
	}
}
