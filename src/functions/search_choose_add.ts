// NEED TO OPTIMISE ERROR HANDLING

/* 
1. Send browser request to search for each ingredient in sainsburys
2. Choose particular ingredient
 */

import axios from 'axios';

interface Ingredient {
  name: string;
  total_amount: string;
}

interface SearchResult {
  name: string;
  price: number;
  id: number;
}
// create search function with unnecessary parameters and headers removed
// value of filter[keyword] can be altered
// is this the best way of handling the error?

export async function searchChooseAdd(): Promise<SearchResult> {
  const url = 'https://www.sainsburys.co.uk/groceries-api/gol-services/product/v1/product';
  const params = {
    'filter[keyword]': `cheese`,
    //'include[PRODUCT_AD]': 'citrus',
    //'citrus_max_number_ads': '5',
    'page_number': '1',
    'page_size': '60',
    'sort_order': 'FAVOURITES_FIRST',
    //'store_identifier': '0054',
    //'region': 'England',
    //'flexi_stores': '2665' 
  }
  const headers = {
      //'authority': 'www.sainsburys.co.uk',
      //'method': 'GET',
      //'path': '/groceries-api/gol-services/product/v1/product?filter[keyword]=cheddar%20cheese&include[PRODUCT_AD]=citrus&citrus_max_number_ads=5&page_number=1&page_size=60&sort_order=FAVOURITES_FIRST',
      //'scheme': 'https',
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.9',
      //'Content-Type': 'application/json',
      //'Cookie': 'last_button_track=false; OptanonAlertBoxClosed=2024-06-17T17:25:10.906Z; GOLVI=196bd9f55be04d52b9670c1ae4ad26b2; topnav_click=false; Apache=10.8.240.27.1718645130197581; WC_ACTIVEPOINTER=44%2C10151; WC_SESSION_ESTABLISHED=true; WC_PERSISTENT=IXj3irA0fzyBplhUDvyDuNcQHL8%3D%0A%3B2024-06-17+20%3A41%3A18.891_1718645210686-8_10151; prizeDrawPopUp_customer1In20Chance=false; websphere_id=1718645210686-8; espot_click=false; SESSION_COOKIEACCEPT=true; ak_bmsc=C280897F4A701AC3C6A8A943365D9167~000000000000000000000000000000~YAAQZ7d1aMdqEheQAQAAY2d8LxjNCK3/w8ZJZoojqfBF0hnV6thtxaUtORzpec8JEItCgc14CM76VVMkM/iC+1gZTtPr+s1cdpFdJH3zHQsL6+zvmAWkjLdafuw/3GL0MsYEivN+wCogBAt0Or4W5d5lrCIwlLQAWnrgxY2e6aDnnGtZoq6YFJgYO6YRPL30KjVpotJ9EdwxCXuiTYIXz10Y7DXSka9wIKK/4k7hoz4oXn13ftNRbZjEH5FztDAXYSPdLZwsQqURGGATuHtOrDvJzi38+lXCDAsN5Jt2y9SIUQV0yWZPn+Yg5N8xjrna7A3iBLs1msRhjiQkn3QlTbQleN5NPVYnEUYccoUWIB3cBCJTJQDg7Kxkw98Mtts2dhamZd7piDf61Eys/dIizw==; JSESSIONID=0000j5zfOS-8vo4tWcKq-ilA7B2:1hpvd8s3p; WC_AUTHENTICATION_-1002=-1002%2C3jIiHU%2F3lFc4jalpGDAhYOztAdQ%3D; WC_GENERIC_ACTIVITYDATA=[93541236848%3Atrue%3Afalse%3A0%3AENNrH00yd2GWvCWrM4rXvV1OZ58%3D][com.ibm.commerce.context.entitlement.EntitlementContext|10502%2610502%26null%26-2000%26null%26null%26null][com.sol.commerce.context.SolBusinessContext|null%26null%26null%26null%26null%26null%26null%26null%26false%26false%26false%26null%26false%26null%26false%26false%26null%26false%26false%26false%26null%26false%26false%26false%26null%26null%26null%26null%260%260%26null][com.ibm.commerce.context.audit.AuditContext|1718645210686-8][com.ibm.commerce.context.globalization.GlobalizationContext|44%26GBP%2644%26GBP][com.ibm.commerce.store.facade.server.context.StoreGeoCodeContext|null%26null%26null%26null%26null%26null][com.ibm.commerce.catalog.businesscontext.CatalogContext|null%26null%26false%26false%26false][com.ibm.commerce.context.experiment.ExperimentContext|null][com.ibm.commerce.context.preview.PreviewContext|null%26null%26false][CTXSETNAME|Store][com.ibm.commerce.context.base.BaseContext|10151%26-1002%26-1002%26-1][com.sol.commerce.catalog.businesscontext.SolCatalogContext|10241%26null%26false%26false%26false%26null%26null]; _abck=3F3900D095534FF8B2507354FB49B29F~0~YAAQHLd1aGRV3yaQAQAAz/DELwwCTnzUUcxcf9hLDXtzWv4W/Y69X/fq11ZxUfly0Jsc4Stl9QuPyDmwE4iXOpBEFFrNbXlOKek2KDfFbcZXJHaik0GW7dYVUR4OaVkKlQoxRyaAV8LRI6gHbpB+JXHbp0GAEhp4C6xFVhRMJlhSlcqrBQHeLpsDp+0YaZ0a5iu9zkah3xu6PsEjyu6JUlhdi4FZi/x+x3ubaFh/5aZ0UQ2VC/QMsEj6jUSoo9EK35rhfkfNPq3plHBNeYS/iHe2NwqMFSevVpP2QISTfVzxzB6fy6SU9o/DxGkyAEUibhvwMNEKlxR+BlvCXTyI//ICeZSkskPcXJayTlsWuS0Y3dfGXvLMdrOCkpXinTH0bO5ex/VVEKVwmRbaExrGocqXpyLWBZRfi8gNY693~-1~-1~-1; WC_USERACTIVITY_-1002=-1002%2C10151%2C0%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2CnMUDZyOaa3pgcU79Vzu5tWBBqtfz%2F9%2BV%2B%2F4sfXcPxnY%2FYLpD%2BdEABEsLZ2KDGuNVDojBiuVqg0%2BAMz3b58LF1VeR4MCnPEu3XdqBjn26iAN4vbDoDpzUPaQYX0pcLaNmgXe7ckYZGO577aAFpLR8g%2F26QXdmNlU%2BlWUjaoC23iZmSLbZW1kQ49c5Fkuf5tgGLxkQpCtF6tHBuMyzSRWTYA%3D%3D; search_redirect_flag=1; bm_sv=8A00D03B63426AA272AC179F73C981AF~YAAQbLd1aLv8xRiQAQAARMnHLxh9sta8XxmxApBoUPdCUaRAaBL+B6LsuMPUk8pt9NeDGzLe1fGCvSb/TwqhXc7+l4IZQ92F/wZVyPXZcLIDEOBKsRdTiYfa1yKxyOPGL7gjLATjoJ+67e/wnXzHCOTwgxjkymhkRMmR7GaJNwvUPBHqTA5sWIn5alzxl4QxfL6cWUXZtR1ax5X6LwQ2NnPh/ufl1yv4hvBMhZOz2fqhhw/l7er9wZIuwq0ixcpu2r4KQkegnw==~1; bm_sz=E4612076CF07C890FBE7C423BD5A8A12~YAAQbLd1aLz8xRiQAQAARMnHLxhzQ5qSExQhDqP4F7/YxpC8ea5b9Hu6uf6+gtnaYc7afT/Xzv1gnyHQXUw0bTZumkCBVCplNES4WEB0Kjb8cbJr8zvSmqwCaUWkJxSRtHeSBV21LlU3xjDUZdSUFvIG4YW/XSp5BRsPp1xM/TK+gDtwZDZ/64uRq6MnTuhLiX9a8524hNUURObL+2Qx6aABfZcx2Bd/yGMwE0wBfWuSCb8q+mMkMOSWfiNqvcrNDiCEdHOcr+V0D8zvSb3gO0ppyO9CKLb554lVAt6q+Xh/3JICShZBnyi27kW5EHqEi3IHMi9qzFck97En5NRdwAt1yXjuNHi1qUSkp+pM8SqpFp8YrFFPOdaA2XIkeJTJ4l4hUWagxN6wSezMSFk45Scj4LzUgkVvxQQxqaYs60NqKepBeZGezidRBcRvVyBZzUKjqPwjr5GiotCLPW/82qmWhx00rTsFwlSylua2fFMKGUI6EkcadEdt9W4iR9sbR+od/twkQMjDyEk3KXzySYPkQT9WL6+IyQ==~4471092~4407865; akavpau_vpc_gol_default=1718788841~id=d9c48d6cec50d886e9249222ed5ecdbd; utag_main=v_id:0190273b2d56000df13b213930c805075001d06d00942$_sn:4$_ss:0$_st:1718790341025$dc_visit:4$_se:11$ses_id:1718787185807%3Bexp-session$_pn:19%3Bexp-session$dc_event:43%3Bexp-session$previousPageName:web%3Agroceries%3Ahomepage%3Bexp-session$previousSiteSection:homepage%3Bexp-session$previousPagePath:%2Fshop%2Fgb%2Fgroceries%3Bexp-session; OptanonConsent=isGpcEnabled=0&datestamp=Wed+Jun+19+2024+10%3A15%3A41+GMT%2B0100+(British+Summer+Time)&version=202401.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=532c73a2-28db-4108-8565-b02db61f4dfc&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A1&geolocation=GB%3BENG&AwaitingReconsent=false; AWSALB=+/mbxlwVlbQyoIcu27HD1Tvf0CcDEu0YA3nfNwTe2hYGGICkUDtA+z1PsXFqdDnPAXBkneXKJe4Q7tS/TUPPMPRaaa3iY7LIvGSl/ghgbiwXEvMxbGTR4c9hAbF9; AWSALBCORS=+/mbxlwVlbQyoIcu27HD1Tvf0CcDEu0YA3nfNwTe2hYGGICkUDtA+z1PsXFqdDnPAXBkneXKJe4Q7tS/TUPPMPRaaa3iY7LIvGSl/ghgbiwXEvMxbGTR4c9hAbF9',
      //'Enabled-Feature-Flags': 'add_to_favourites,ads_conditionals,findability_v5,show_static_cnc_messaging,event_dates,fetch_future_slot_weeks,click_and_collect_promo_banner,cookie_law_link,citrus_banners,citrus_search_trio_banners,citrus_favourites_trio_banners,offers_trio_banners_single_call,special_logo,custom_product_messaging,promotional_link,findability_search,findability_autosuggest,findability_orchestrator,fto_header_flag,recurring_slot_skip_opt_out,first_favourite_oauth_entry_point,seasonal_favourites,cnc_start_amend_order_modal,favourites_product_cta_alt,get_favourites_from_v2,offers_config,alternatives_modal,relevancy_rank,show_hd_xmas_slots_banner,meal_planner,nectar_destination_page,nectar_card_associated,browse_pills_nav_type,zone_featured,use_cached_findability_results,event_zone_list,cms_carousel_zone_list,show_ynp_change_slot_banner,recipe_scrapbooks_enabled,event_carousel_skus,trolley_nectar_card,call_bcs,catchweight_dropdown,citrus_xsell,constant_commerce_v2,desktop_interstitial_variant,disable_product_cache_validation,favourites_pill_nav,favourites_whole_service,first_favourites_static,foodmaestro_modal,hfss_restricted,interstitial_variant,kg_price_label,krang_recommendations,mobile_interstitial_variant,nectar_prices,new_favourites_service,ni_brexit_banner,recipes_ingredients_modal,review_syndication,sale_january,similar_products,sponsored_featured_tiles,xmas_dummy_skus,your_nectar_prices',
      //'Priority': 'u=1, i',
      'Referer': 'https://www.sainsburys.co.uk/gol-ui/SearchResults/cheddar%20cheese',
      //'Sec-Ch-Ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      //'Sec-Ch-Ua-Mobile': '?0',
      //'Sec-Ch-Ua-Platform': '"macOS"',
      //'Sec-Fetch-Dest': 'empty',
      //'Sec-Fetch-Mode': 'cors',
      //'Sec-Fetch-Site': 'same-origin',
      //'Traceparent': '00-602174f79de21979262d1e00d4101670-e15fe82c4976551f-01',
      //'Tracestate': '2092320@nr=0-1-1782819-181742266-e15fe82c4976551f----1718788541341',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      //'Wcauthtoken': '-1002%2C3jIiHU%2F3lFc4jalpGDAhYOztAdQ%3D'
  };

  try {
    const response = await axios.get(url, { 
        params: params,
        headers: headers,
    });

    // create json object with products listed from search
    // need to add code to skip if newEl cannot be formed from the response data, skip to next one
    const data: SearchResult[] = response.data.products.map((el: any) => {
      return {
        name: el.name,
        price: el.retail_price["price"],
        id: el.product_uid,
      };
    });
    //console.log(data);
    const chosen_ingredient = data[0];
    console.log(chosen_ingredient);
    return chosen_ingredient;
    // code to write to file for debugging
    /* const outputPath = path.join(__dirname, 'products.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    const chosen_product = data.products[0].name
    console.log(chosen_product) */

    } catch (error) {
      console.error('Error searching product:', error);
      throw(error);
    }
  }

  searchChooseAdd();