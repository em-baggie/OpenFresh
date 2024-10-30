import axios from 'axios';
import { SessionData } from './login';
import { Ingredient } from './extract_ingredients'

export interface ChosenIngredient {
  puid: string;
  quantity: 1;
}

export async function SearchForIngredients(session_data: SessionData, ingredient: Ingredient): Promise<ChosenIngredient | undefined> {

  const url = 'https://www.sainsburys.co.uk/groceries-api/gol-services/product/v1/product';
  const params = {
    'filter[keyword]': ingredient.name,
    //'include[PRODUCT_AD]': 'citrus',
    //'citrus_max_number_ads': '5',
    // 'page_number': '1',
    // 'page_size': '60',
    'sort_order': 'FAVOURITES_FIRST',
    //'store_identifier': '0054',
    //'region': 'England',
    //'flexi_stores': '2665' 
  }
  const headers = {
      'authority': 'www.sainsburys.co.uk',
      'method': 'GET',
      //'path': '/groceries-api/gol-services/product/v1/product?filter[keyword]=cheddar%20cheese&include[PRODUCT_AD]=citrus&citrus_max_number_ads=5&page_number=1&page_size=60&sort_order=FAVOURITES_FIRST',
      'scheme': 'https',
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.9',
      'Content-Type': 'application/json',
      'Cookie': session_data.cookies,
      //'Enabled-Feature-Flags': 'add_to_favourites,ads_conditionals,findability_v5,show_static_cnc_messaging,event_dates,fetch_future_slot_weeks,click_and_collect_promo_banner,cookie_law_link,citrus_banners,citrus_search_trio_banners,citrus_favourites_trio_banners,offers_trio_banners_single_call,special_logo,custom_product_messaging,promotional_link,findability_search,findability_autosuggest,findability_orchestrator,fto_header_flag,recurring_slot_skip_opt_out,first_favourite_oauth_entry_point,seasonal_favourites,cnc_start_amend_order_modal,favourites_product_cta_alt,get_favourites_from_v2,offers_config,alternatives_modal,relevancy_rank,show_hd_xmas_slots_banner,meal_planner,nectar_destination_page,nectar_card_associated,browse_pills_nav_type,zone_featured,use_cached_findability_results,event_zone_list,cms_carousel_zone_list,show_ynp_change_slot_banner,recipe_scrapbooks_enabled,event_carousel_skus,trolley_nectar_card,call_bcs,catchweight_dropdown,citrus_xsell,constant_commerce_v2,desktop_interstitial_variant,disable_product_cache_validation,favourites_pill_nav,favourites_whole_service,first_favourites_static,foodmaestro_modal,hfss_restricted,interstitial_variant,kg_price_label,krang_recommendations,mobile_interstitial_variant,nectar_prices,new_favourites_service,ni_brexit_banner,recipes_ingredients_modal,review_syndication,sale_january,similar_products,sponsored_featured_tiles,xmas_dummy_skus,your_nectar_prices',
      //'Priority': 'u=1, i',
      //'Referer': 'https://www.sainsburys.co.uk/gol-ui/SearchResults/cheddar%20cheese',
      //'Sec-Ch-Ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      //'Sec-Ch-Ua-Mobile': '?0',
      //'Sec-Ch-Ua-Platform': '"macOS"',
      //'Sec-Fetch-Dest': 'empty',
      //'Sec-Fetch-Mode': 'cors',
      //'Sec-Fetch-Site': 'same-origin',
      //'Traceparent': '00-602174f79de21979262d1e00d4101670-e15fe82c4976551f-01',
      //'Tracestate': '2092320@nr=0-1-1782819-181742266-e15fe82c4976551f----1718788541341',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      //'Wcauthtoken':
  };

  try {
    const response = await axios.get(url, { 
        params: params,
        headers: headers,
    });

    // create json object with products listed from search
    // need to add code to skip if newEl cannot be formed from the response data, skip to next one
    const data: ChosenIngredient[] = response.data.products.map((el: any) => {
      return {
        puid: el.product_uid,
        iuid: el.item_uid,
        quantity: 1,
      };
    });
    //choose first ingredient - can change logic later
    const chosen_ingredient = data[0];
    console.log(chosen_ingredient);
    return chosen_ingredient;
  
    } catch (error) {
      console.error('Error searching product:', error);
      return undefined;
    }
  }
