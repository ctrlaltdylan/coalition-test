<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
	/**
	 * Get products path
	 *
	 * @return string
	 */
	private function getProductsPath()
	{
		return base_path() . '/products.json';
	}

	/**
	 * Submit
	 *
	 * @param Request
	 * @return Response
	 */
	public function store(Request $request)
	{
		$data = $request->input();

		// append data to products.json
		$inp = file_get_contents($this->getProductsPath());
		$tempArray = json_decode($inp);

		array_push($tempArray, $data);

		$jsonData = json_encode($tempArray);

		file_put_contents($this->getProductsPath(), $jsonData);

		return ['message' => 'success'];
	}

	/**
	 * Products listing
	 *
	 * @param Storage
	 * @return Response
	 */
	public function listing()
	{
		if(\Storage::exists('products.json')) {
			$products = file_get_contents($this->getProductsPath());

			return $products;
		}

		return [];
	}
}
