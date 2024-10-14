import { Response } from "../../src/us_enrichment/Response.js";
import { expect } from "chai";

describe("A US Enrichment Response", function () {
  it("is initialized correctly with API response data.", function () {
    const mockResponse = {
      smarty_key: "a",
      data_set_name: "b",
      data_subset_name: "c",
      attributes: {
        "1st_floor_sqft": "01",
        "2nd_floor_sqft": "02",
        acres: "0",
        address_info_privacy: "1",
        air_conditioner: "2",
        arbor_pergola: "3",
        assessed_improvement_percent: "4",
        assessed_improvement_value: "5",
        assessed_land_value: "6",
        assessed_value: "7",
        assessor_last_update: "8",
        assessor_taxroll_update: "9",
        attic_area: "10",
        attic_flag: "11",
        balcony: "12",
        balcony_area: "13",
        basement_sqft: "14",
        basement_sqft_finished: "15",
        basement_sqft_unfinished: "16",
        bath_house: "17",
        bath_house_sqft: "18",
        bathrooms_partial: "19",
        bathrooms_total: "20",
        bedrooms: "21",
        block_1: "22",
        block_2: "23",
        boat_access: "24",
        boat_house: "25",
        boat_house_sqft: "26",
        boat_lift: "27",
        bonus_room: "28",
        breakfast_nook: "29",
        breezeway: "30",
        building_definition: "31",
        building_sqft: "32",
        cabin: "33",
        cabin_sqft: "34",
        canopy: "35",
        canopy_sqft: "36",
        carport: "37",
        carport_sqft: "38",
        cbsa_code: "39",
        cbsa_name: "40",
        cellar: "41",
        census_block: "42",
        census_block_group: "43",
        census_fips_place_code: "44",
        census_tract: "45",
        central_vacuum: "46",
        code_title_company: "47",
        combined_statistical_area: "48",
        community_rec: "49",
        company_flag: "50",
        congressional_district: "51",
        construction_type: "52",
        contact_city: "53",
        contact_crrt: "54",
        contact_full_address: "55",
        contact_house_number: "56",
        contact_main_info_format: "57",
        contact_mail_info_privacy: "58",
        contact_mailing_county: "59",
        contact_mailing_fips: "60",
        contact_post_direction: "61",
        contact_pre_direction: "62",
        contact_state: "63",
        contact_street_name: "64",
        contact_suffix: "65",
        contact_unit_designator: "66",
        contact_value: "67",
        contact_zip: "68",
        contact_zip4: "69",
        courtyard: "70",
        courtyard_area: "71",
        deck: "72",
        deck_area: "73",
        deed_document_page: "74",
        deed_document_book: "75",
        deed_document_number: "76",
        deed_owner_first_name: "77",
        deed_owner_first_name2: "78",
        deed_owner_first_name3: "79",
        deed_owner_first_name4: "80",
        deed_owner_full_name: "81",
        deed_owner_full_name2: "82",
        deed_owner_full_name3: "83",
        deed_owner_full_name4: "84",
        deed_owner_last_name: "85",
        deed_owner_last_name2: "86",
        deed_owner_last_name3: "87",
        deed_owner_last_name4: "88",
        deed_owner_middle_name: "89",
        deed_owner_middle_name2: "90",
        deed_owner_middle_name3: "91",
        deed_owner_middle_name4: "92",
        deed_owner_suffix: "93",
        deed_owner_suffix2: "94",
        deed_owner_suffix3: "95",
        deed_owner_suffix4: "96",
        deed_sale_date: "97",
        deed_sale_price: "98",
        deed_transaction_id: "99",
        depth_linear_footage: "100",
        disabled_tax_exemption: "101",
        driveway_sqft: "102",
        driveway_type: "103",
        effective_year_built: "104",
        elevation_feet: "105",
        elevator: "106",
        equestrian_arena: "107",
        escalator: "108",
        exercise_room: "109",
        exterior_walls: "110",
        family_room: "111",
        fence: "112",
        fence_area: "113",
        fips_code: "114",
        fire_resistance_code: "115",
        fire_sprinkler_flag: "116",
        fireplace: "117",
        fireplace_number: "118",
        first_name: "119",
        first_name2: "120",
        first_name3: "121",
        first_name4: "122",
        flooring: "123",
        foundation: "124",
        game_room: "125",
        garage: "126",
        garage_sqft: "127",
        gazebo: "128",
        gazebo_sqft: "129",
        golf_course: "130",
        grainery: "131",
        grainery_sqft: "132",
        great_room: "133",
        greenhouse: "134",
        greenhouse_sqft: "135",
        gross_sqft: "136",
        guesthouse: "137",
        guesthouse_sqft: "138",
        handicap_accessibility: "139",
        heat: "140",
        heat_fuel_type: "141",
        hobby_room: "142",
        homeowner_tax_exemption: "143",
        instrument_date: "144",
        intercom_system: "145",
        interest_rate_type_2: "146",
        interior_structure: "147",
        kennel: "148",
        kennel_sqft: "149",
        land_use_code: "150",
        land_use_group: "151",
        land_use_standard: "152",
        last_name: "153",
        last_name_2: "154",
        last_name_3: "155",
        last_name_4: "156",
        latitude: "157",
        laundry: "158",
        lean_to: "159",
        lean_to_sqft: "160",
        legal_description: "161",
        legal_unit: "162",
        lender_address: "163",
        lender_address_2: "164",
        lender_city: "165",
        lender_city_2: "166",
        lender_code: "167",
        lender_code_2: "168",
        lender_first_name: "169",
        lender_first_name_2: "170",
        lender_last_name: "171",
        lender_last_name_2: "172",
        lender_name: "173",
        lender_name_2: "174",
        lender_seller_carry_back: "175",
        lender_seller_carry_back_2: "176",
        lender_state: "177",
        lender_state_2: "178",
        lender_zip: "179",
        lender_zip_2: "180",
        lender_zip_extended: "181",
        lender_zip_extended_2: "182",
        loading_platform: "183",
        loading_platform_sqft: "184",
        longitude: "185",
        lot_1: "186",
        lot_2: "187",
        lot_3: "188",
        lot_sqft: "189",
        market_improvement_percent: "190",
        market_improvement_value: "191",
        market_land_value: "192",
        market_value_year: "193",
        match_type: "194",
        media_room: "195",
        metro_division: "196",
        middle_name: "197",
        middle_name_2: "198",
        middle_name_3: "199",
        middle_name_4: "200",
        milkhouse: "201",
        milkhouse_sqft: "202",
        minor_civil_division_code: "203",
        minor_civil_division_name: "204",
        mobile_home_hookup: "205",
        mortgage_amount: "206",
        mortgage_amount_2: "207",
        mortgage_due_date: "208",
        mortgage_due_date_2: "209",
        mortgage_interest_rate: "210",
        mortgage_interest_rate_type: "211",
        mortgage_lender_code: "212",
        mortgage_rate_2: "213",
        mortgage_recording_date: "214",
        mortgage_recording_date_2: "215",
        mortgage_term: "216",
        mortgage_term_2: "217",
        mortgage_term_type: "218",
        mortgage_term_type_2: "219",
        mortgage_type: "220",
        mortgage_type_2: "221",
        msa_code: "222",
        msa_name: "223",
        mud_room: "224",
        multi_parcel_flag: "225",
        name_title_company: "226",
        neighborhood_code: "227",
        number_of_buildings: "228",
        office: "229",
        office_sqft: "230",
        other_tax_exemption: "231",
        outdoor_kitchen_fireplace: "232",
        overhead_door: "233",
        owner_full_name: "234",
        owner_full_name_2: "235",
        owner_full_name_3: "236",
        owner_full_name_4: "237",
        owner_occupancy_status: "238",
        ownership_transfer_date: "239",
        ownership_transfer_doc_number: "240",
        ownership_transfer_transaction_id: "241",
        ownership_type: "242",
        ownership_type_2: "243",
        ownership_vesting_relation_code: "244",
        parcel_account_number: "245",
        parcel_map_book: "246",
        parcel_map_page: "247",
        parcel_number_alternate: "248",
        parcel_number_formatted: "249",
        parcel_number_previous: "250",
        parcel_number_year_added: "251",
        parcel_number_year_change: "252",
        parcel_raw_number: "253",
        parcel_shell_record: "254",
        parking_spaces: "255",
        patio_area: "256",
        phase_name: "257",
        plumbing_fixtures_count: "257",
        pole_struct: "258",
        pole_struct_sqft: "259",
        pond: "260",
        pool: "261",
        pool_area: "262",
        poolhouse: "263",
        poolhouse_sqft: "264",
        porch: "265",
        porch_area: "266",
        poultry_house: "267",
        poultry_house_sqft: "268",
        previous_assessed_value: "269",
        prior_sale_amount: "270",
        prior_sale_date: "271",
        property_address_carrier_route_code: "272",
        property_address_city: "273",
        property_address_full: "274",
        property_address_house_number: "275",
        property_address_post_direction: "276",
        property_address_pre_direction: "277",
        property_address_state: "278",
        property_address_street_name: "279",
        property_address_street_suffix: "280",
        property_address_unit_designator: "281",
        property_address_unit_value: "282",
        property_address_zip_4: "283",
        property_address_zipcode: "284",
        publication_date: "285",
        quarter: "286",
        quarter_quarter: "287",
        quonset: "288",
        quonset_sqft: "289",
        range: "290",
        recording_date: "291",
        roof_cover: "292",
        roof_frame: "293",
        rooms: "294",
        rv_parking: "295",
        safe_room: "296",
        sale_amount: "297",
        sale_date: "298",
        sauna: "299",
        section: "300",
        security_alarm: "301",
        senior_tax_exemption: "302",
        sewer_type: "303",
        shed: "304",
        shed_sqft: "305",
        silo: "306",
        silo_sqft: "307",
        sitting_room: "308",
        situs_county: "309",
        situs_state: "310",
        sound_system: "311",
        sports_court: "312",
        sprinklers: "313",
        stable: "314",
        stable_sqft: "315",
        storage_building: "316",
        storage_buildling_sqft: "317",
        stories_number: "318",
        storm_shelter: "319",
        storm_shutter: "320",
        structure_style: "321",
        study: "322",
        subdivision: "323",
        suffix: "324",
        suffix_2: "325",
        suffix_3: "326",
        suffix_4: "327",
        sunroom: "328",
        tax_assess_year: "329",
        tax_billed_amount: "330",
        tax_delinquent_year: "331",
        tax_fiscal_year: "332",
        tax_jurisdiction: "333",
        tax_rate_area: "334",
        tennis_court: "335",
        topography_code: "336",
        total_market_value: "337",
        township: "338",
        tract_number: "339",
        transfer_amount: "340",
        trust_description: "341",
        unit_count: "342",
        upper_floors_sqft: "343",
        utility: "344",
        utility_building: "345",
        utility_building_sqft: "346",
        utility_sqft: "347",
        veteran_tax_exemption: "348",
        view_description: "349",
        water_feature: "350",
        water_service_type: "351",
        wet_bar: "352",
        widow_tax_exemption: "353",
        width_linear_footage: "354",
        wine_cellar: "355",
        year_built: "356",
        zoning: "357",
      },
    };
    let response = new Response(mockResponse);

    expect(response.attributes.firstFloorSqft).to.equal("01");
    expect(response.attributes.secondFlootSqft).to.equal("02");
    expect(response.attributes.acres).to.equal("0");
    expect(response.attributes.addressInfoPrivacy).to.equal("1");
    expect(response.attributes.airConditioner).to.equal("2");
    expect(response.attributes.arborPergola).to.equal("3");
    expect(response.attributes.assessedImprovementPercent).to.equal("4");
    expect(response.attributes.assessedImprovementValue).to.equal("5");
    expect(response.attributes.assessedLandValue).to.equal("6");
    expect(response.attributes.assessedValue).to.equal("7");
    expect(response.attributes.assessorLastUpdate).to.equal("8");
    expect(response.attributes.assessorTaxrollUpdate).to.equal("9");
    expect(response.attributes.atticArea).to.equal("10");
    expect(response.attributes.atticFlag).to.equal("11");
    expect(response.attributes.balcony).to.equal("12");
    expect(response.attributes.balconyArea).to.equal("13");
    expect(response.attributes.basementSqft).to.equal("14");
    expect(response.attributes.basementSqftFinished).to.equal("15");
    expect(response.attributes.basementsqftUnfinished).to.equal("16");
    expect(response.attributes.bathHouse).to.equal("17");
    expect(response.attributes.bathHouseSqft).to.equal("18");
    expect(response.attributes.bathroomsPartial).to.equal("19");
    expect(response.attributes.bathroomsTotal).to.equal("20");
    expect(response.attributes.bedrooms).to.equal("21");
    expect(response.attributes.block1).to.equal("22");
    expect(response.attributes.block2).to.equal("23");
    expect(response.attributes.boatAccess).to.equal("24");
    expect(response.attributes.boatHouse).to.equal("25");
    expect(response.attributes.boatHouseSqft).to.equal("26");
    expect(response.attributes.boatLift).to.equal("27");
    expect(response.attributes.bonusRoom).to.equal("28");
    expect(response.attributes.breakfastNook).to.equal("29");
    expect(response.attributes.breezeway).to.equal("30");
    expect(response.attributes.buildingDefinitionCode).to.equal("31");
    expect(response.attributes.buildingSqft).to.equal("32");
    expect(response.attributes.cabin).to.equal("33");
    expect(response.attributes.cabinSqft).to.equal("34");
    expect(response.attributes.canopy).to.equal("35");
    expect(response.attributes.canopySqft).to.equal("36");
    expect(response.attributes.carport).to.equal("37");
    expect(response.attributes.carportSqft).to.equal("38");
    expect(response.attributes.cbsaCode).to.equal("39");
    expect(response.attributes.cbsaName).to.equal("40");
    expect(response.attributes.cellar).to.equal("41");
    expect(response.attributes.censusBlock).to.equal("42");
    expect(response.attributes.censusBlockGroup).to.equal("43");
    expect(response.attributes.censusFipsPlaceCode).to.equal("44");
    expect(response.attributes.censusTract).to.equal("45");
    expect(response.attributes.centralVacuum).to.equal("46");
    expect(response.attributes.codeTitleCompany).to.equal("47");
    expect(response.attributes.combinedStatisticalArea).to.equal("48");
    expect(response.attributes.communityRec).to.equal("49");
    expect(response.attributes.companyFlag).to.equal("50");
    expect(response.attributes.congressionalDistrict).to.equal("51");
    expect(response.attributes.constructionType).to.equal("52");
    expect(response.attributes.contactCity).to.equal("53");
    expect(response.attributes.contactCrrt).to.equal("54");
    expect(response.attributes.contactFullAddress).to.equal("55");
    expect(response.attributes.contactHouseNumber).to.equal("56");
    expect(response.attributes.contactMailInfoFormat).to.equal("57");
    expect(response.attributes.contactMailInfoPrivacy).to.equal("58");
    expect(response.attributes.contactMailingCounty).to.equal("59");
    expect(response.attributes.contactMailingFips).to.equal("60");
    expect(response.attributes.contactPostDirection).to.equal("61");
    expect(response.attributes.contactPreDirection).to.equal("62");
    expect(response.attributes.contactState).to.equal("63");
    expect(response.attributes.contactStreetName).to.equal("64");
    expect(response.attributes.contactSuffix).to.equal("65");
    expect(response.attributes.contactUnitDesignator).to.equal("66");
    expect(response.attributes.contactValue).to.equal("67");
    expect(response.attributes.contactZip).to.equal("68");
    expect(response.attributes.contactZip4).to.equal("69");
    expect(response.attributes.courtyard).to.equal("70");
    expect(response.attributes.courtyardArea).to.equal("71");
    expect(response.attributes.deck).to.equal("72");
    expect(response.attributes.deckArea).to.equal("73");
    expect(response.attributes.deedDocumentPage).to.equal("74");
    expect(response.attributes.deedDocumentBook).to.equal("75");
    expect(response.attributes.deedDocumentNumber).to.equal("76");
    expect(response.attributes.deedOwnerFirstName).to.equal("77");
    expect(response.attributes.deedOwnerFirstName2).to.equal("78");
    expect(response.attributes.deedOwnerFirstName3).to.equal("79");
    expect(response.attributes.deedOwnerFirstName4).to.equal("80");
    expect(response.attributes.deedOwnerFullName).to.equal("81");
    expect(response.attributes.deedOwnerFullName2).to.equal("82");
    expect(response.attributes.deedOwnerFullName3).to.equal("83");
    expect(response.attributes.deedOwnerFullName4).to.equal("84");
    expect(response.attributes.deedOwnerLastName).to.equal("85");
    expect(response.attributes.deedOwnerLastName2).to.equal("86");
    expect(response.attributes.deedOwnerLastName3).to.equal("87");
    expect(response.attributes.deedOwnerLastName4).to.equal("88");
    expect(response.attributes.deedOwnerMiddleName).to.equal("89");
    expect(response.attributes.deedOwnerMiddleName2).to.equal("90");
    expect(response.attributes.deedOwnerMiddleName3).to.equal("91");
    expect(response.attributes.deedOwnerMiddleName4).to.equal("92");
    expect(response.attributes.deedOwnerSuffix).to.equal("93");
    expect(response.attributes.deedOwnerSuffix2).to.equal("94");
    expect(response.attributes.deedOwnerSuffix3).to.equal("95");
    expect(response.attributes.deedOwnerSuffix4).to.equal("96");
    expect(response.attributes.deedSaleDate).to.equal("97");
    expect(response.attributes.deedSalePrice).to.equal("98");
    expect(response.attributes.deedTransactionId).to.equal("99");
    expect(response.attributes.depthLinearFootage).to.equal("100");
    expect(response.attributes.disabledTaxExemption).to.equal("101");
    expect(response.attributes.drivewaySqft).to.equal("102");
    expect(response.attributes.drivewayType).to.equal("103");
    expect(response.attributes.effectiveYearBuilt).to.equal("104");
    expect(response.attributes.elevationFeet).to.equal("105");
    expect(response.attributes.elevator).to.equal("106");
    expect(response.attributes.equestrianArena).to.equal("107");
    expect(response.attributes.escalator).to.equal("108");
    expect(response.attributes.exerciseRoom).to.equal("109");
    expect(response.attributes.exteriorWalls).to.equal("110");
    expect(response.attributes.familyRoom).to.equal("111");
    expect(response.attributes.fence).to.equal("112");
    expect(response.attributes.fenceArea).to.equal("113");
    expect(response.attributes.fipsCode).to.equal("114");
    expect(response.attributes.fireResistanceCode).to.equal("115");
    expect(response.attributes.fireSprinklersFlag).to.equal("116");
    expect(response.attributes.fireplace).to.equal("117");
    expect(response.attributes.fireplaceNumber).to.equal("118");
    expect(response.attributes.firstName).to.equal("119");
    expect(response.attributes.firstName2).to.equal("120");
    expect(response.attributes.firstName3).to.equal("121");
    expect(response.attributes.firstName4).to.equal("122");
    expect(response.attributes.flooring).to.equal("123");
    expect(response.attributes.foundation).to.equal("124");
    expect(response.attributes.gameRoom).to.equal("125");
    expect(response.attributes.garage).to.equal("126");
    expect(response.attributes.garageSqft).to.equal("127");
    expect(response.attributes.gazebo).to.equal("128");
    expect(response.attributes.gazeboSqft).to.equal("129");
    expect(response.attributes.golfCourse).to.equal("130");
    expect(response.attributes.grainery).to.equal("131");
    expect(response.attributes.grainerySqft).to.equal("132");
    expect(response.attributes.greatRoom).to.equal("133");
    expect(response.attributes.greenhouse).to.equal("134");
    expect(response.attributes.greenhouseSqft).to.equal("135");
    expect(response.attributes.grossSqft).to.equal("136");
    expect(response.attributes.guesthouse).to.equal("137");
    expect(response.attributes.guesthouseSqft).to.equal("138");
    expect(response.attributes.handicapAccessibility).to.equal("139");
    expect(response.attributes.heat).to.equal("140");
    expect(response.attributes.heatFuelType).to.equal("141");
    expect(response.attributes.hobbyRoom).to.equal("142");
    expect(response.attributes.homeownerTaxExemption).to.equal("143");
    expect(response.attributes.instrumentDate).to.equal("144");
    expect(response.attributes.intercomSystem).to.equal("145");
    expect(response.attributes.interestRateType2).to.equal("146");
    expect(response.attributes.interiorStructure).to.equal("147");
    expect(response.attributes.kennel).to.equal("148");
    expect(response.attributes.kennelSqft).to.equal("149");
    expect(response.attributes.landUseCode).to.equal("150");
    expect(response.attributes.landUseGroup).to.equal("151");
    expect(response.attributes.landUseStandard).to.equal("152");
    expect(response.attributes.lastName).to.equal("153");
    expect(response.attributes.lastName2).to.equal("154");
    expect(response.attributes.lastName3).to.equal("155");
    expect(response.attributes.lastName4).to.equal("156");
    expect(response.attributes.latitude).to.equal("157");
    expect(response.attributes.laundry).to.equal("158");
    expect(response.attributes.leanTo).to.equal("159");
    expect(response.attributes.leanToSqft).to.equal("160");
    expect(response.attributes.legalDescription).to.equal("161");
    expect(response.attributes.legalUnit).to.equal("162");
    expect(response.attributes.lenderAddress).to.equal("163");
    expect(response.attributes.lenderAddress2).to.equal("164");
    expect(response.attributes.lenderCity).to.equal("165");
    expect(response.attributes.lenderCity2).to.equal("166");
    expect(response.attributes.lenderCode).to.equal("167");
    expect(response.attributes.lenderCode2).to.equal("168");
    expect(response.attributes.lenderFirstName).to.equal("169");
    expect(response.attributes.lenderFirstName2).to.equal("170");
    expect(response.attributes.lenderLastName).to.equal("171");
    expect(response.attributes.lenderLastName2).to.equal("172");
    expect(response.attributes.lenderName).to.equal("173");
    expect(response.attributes.lenderName2).to.equal("174");
    expect(response.attributes.lenderSellerCarryBack).to.equal("175");
    expect(response.attributes.lenderSellerCarryBack2).to.equal("176");
    expect(response.attributes.lenderState).to.equal("177");
    expect(response.attributes.lenderState2).to.equal("178");
    expect(response.attributes.lenderZip).to.equal("179");
    expect(response.attributes.lenderZip2).to.equal("180");
    expect(response.attributes.lenderZipExtended).to.equal("181");
    expect(response.attributes.lenderZipExtended2).to.equal("182");
    expect(response.attributes.loadingPlatform).to.equal("183");
    expect(response.attributes.loadingPlatformSqft).to.equal("184");
    expect(response.attributes.longitude).to.equal("185");
    expect(response.attributes.lot1).to.equal("186");
    expect(response.attributes.lot2).to.equal("187");
    expect(response.attributes.lot3).to.equal("188");
    expect(response.attributes.lotSqft).to.equal("189");
    expect(response.attributes.marketImprovementPercent).to.equal("190");
    expect(response.attributes.marketImprovementValue).to.equal("191");
    expect(response.attributes.marketLandValue).to.equal("192");
    expect(response.attributes.marketValueYear).to.equal("193");
    expect(response.attributes.matchType).to.equal("194");
    expect(response.attributes.mediaRoom).to.equal("195");
    expect(response.attributes.metroDivision).to.equal("196");
    expect(response.attributes.middleName).to.equal("197");
    expect(response.attributes.middleName2).to.equal("198");
    expect(response.attributes.middleName3).to.equal("199");
    expect(response.attributes.middleName4).to.equal("200");
    expect(response.attributes.milkhouse).to.equal("201");
    expect(response.attributes.milkhouseSqft).to.equal("202");
    expect(response.attributes.minorCivilDivisionCode).to.equal("203");
    expect(response.attributes.minorCivilDivisionName).to.equal("204");
    expect(response.attributes.mobileHomeHookup).to.equal("205");
    expect(response.attributes.mortgageAmount).to.equal("206");
    expect(response.attributes.mortgageAmount2).to.equal("207");
    expect(response.attributes.mortgageDueDate).to.equal("208");
    expect(response.attributes.mortgageDueDate2).to.equal("209");
    expect(response.attributes.mortgageInterestRate).to.equal("210");
    expect(response.attributes.mortgageInterestRateType).to.equal("211");
    expect(response.attributes.mortgageLenderCode).to.equal("212");
    expect(response.attributes.mortgageRate2).to.equal("213");
    expect(response.attributes.mortgageRecordingDate).to.equal("214");
    expect(response.attributes.mortgageRecordingDate2).to.equal("215");
    expect(response.attributes.mortgageTerm).to.equal("216");
    expect(response.attributes.mortgageTerm2).to.equal("217");
    expect(response.attributes.mortgageTermType).to.equal("218");
    expect(response.attributes.mortgageTermType2).to.equal("219");
    expect(response.attributes.mortgageType).to.equal("220");
    expect(response.attributes.mortgageType2).to.equal("221");
    expect(response.attributes.msaCode).to.equal("222");
    expect(response.attributes.msaName).to.equal("223");
    expect(response.attributes.mudRoom).to.equal("224");
    expect(response.attributes.multiParcelFlag).to.equal("225");
    expect(response.attributes.nameTitleCompany).to.equal("226");
    expect(response.attributes.neighborhoodCode).to.equal("227");
    expect(response.attributes.numberOfBuildings).to.equal("228");
    expect(response.attributes.office).to.equal("229");
    expect(response.attributes.officeSqft).to.equal("230");
    expect(response.attributes.otherTaxExemption).to.equal("231");
    expect(response.attributes.outdoorKitchenFireplace).to.equal("232");
    expect(response.attributes.overheadDoor).to.equal("233");
    expect(response.attributes.ownerFullName).to.equal("234");
    expect(response.attributes.ownerFullName2).to.equal("235");
    expect(response.attributes.ownerFullName3).to.equal("236");
    expect(response.attributes.ownerFullName4).to.equal("237");
    expect(response.attributes.ownerOccupancyStatus).to.equal("238");
    expect(response.attributes.ownershipTransferDate).to.equal("239");
    expect(response.attributes.ownershipTransferDocNumber).to.equal("240");
    expect(response.attributes.ownershipTransferTransactionId).to.equal("241");
    expect(response.attributes.ownershipType).to.equal("242");
    expect(response.attributes.ownershipType2).to.equal("243");
    expect(response.attributes.ownershipVestingRelationCode).to.equal("244");
    expect(response.attributes.parcelAccountNumber).to.equal("245");
    expect(response.attributes.parcelMapBook).to.equal("246");
    expect(response.attributes.parcelMapPage).to.equal("247");
    expect(response.attributes.parcelNumberAlternate).to.equal("248");
    expect(response.attributes.parcelNumberFormatted).to.equal("249");
    expect(response.attributes.parcelNumberPrevious).to.equal("250");
    expect(response.attributes.parcelNumberYearAdded).to.equal("251");
    expect(response.attributes.parcelNumberYearChange).to.equal("252");
    expect(response.attributes.parcelRawNumber).to.equal("253");
    expect(response.attributes.parcelShellRecord).to.equal("254");
    expect(response.attributes.parkingSpaces).to.equal("255");
    expect(response.attributes.patioArea).to.equal("256");
    expect(response.attributes.phaseName).to.equal("257");
    expect(response.attributes.plumbingFixturesCount).to.equal("257");
    expect(response.attributes.poleStruct).to.equal("258");
    expect(response.attributes.poleStructSqft).to.equal("259");
    expect(response.attributes.pond).to.equal("260");
    expect(response.attributes.pool).to.equal("261");
    expect(response.attributes.poolArea).to.equal("262");
    expect(response.attributes.poolhouse).to.equal("263");
    expect(response.attributes.poolhouseSqft).to.equal("264");
    expect(response.attributes.porch).to.equal("265");
    expect(response.attributes.porchArea).to.equal("266");
    expect(response.attributes.poultryHouse).to.equal("267");
    expect(response.attributes.poultryHouseSqft).to.equal("268");
    expect(response.attributes.previousAssessedValue).to.equal("269");
    expect(response.attributes.priorSaleAmount).to.equal("270");
    expect(response.attributes.priorSaleDate).to.equal("271");
    expect(response.attributes.propertyAddressCarrierRouteCode).to.equal("272");
    expect(response.attributes.propertyAddressCity).to.equal("273");
    expect(response.attributes.propertyAddressFull).to.equal("274");
    expect(response.attributes.propertyAddressHouseNumber).to.equal("275");
    expect(response.attributes.propertyAddressPostDirection).to.equal("276");
    expect(response.attributes.propertyAddressPreDirection).to.equal("277");
    expect(response.attributes.propertyAddressState).to.equal("278");
    expect(response.attributes.propertyAddressStreetName).to.equal("279");
    expect(response.attributes.propertyAddressStreetSuffix).to.equal("280");
    expect(response.attributes.propertyAddressUnitDesignator).to.equal("281");
    expect(response.attributes.propertyAddressUnitValue).to.equal("282");
    expect(response.attributes.propertyAddressZip4).to.equal("283");
    expect(response.attributes.propertyAddressZipcode).to.equal("284");
    expect(response.attributes.publicationDate).to.equal("285");
    expect(response.attributes.quarter).to.equal("286");
    expect(response.attributes.quarterQuarter).to.equal("287");
    expect(response.attributes.quonset).to.equal("288");
    expect(response.attributes.quonsetSqft).to.equal("289");
    expect(response.attributes.range).to.equal("290");
    expect(response.attributes.recordingDate).to.equal("291");
    expect(response.attributes.roofCover).to.equal("292");
    expect(response.attributes.roofFrame).to.equal("293");
    expect(response.attributes.rooms).to.equal("294");
    expect(response.attributes.rvParking).to.equal("295");
    expect(response.attributes.safeRoom).to.equal("296");
    expect(response.attributes.saleAmount).to.equal("297");
    expect(response.attributes.saleDate).to.equal("298");
    expect(response.attributes.sauna).to.equal("299");
    expect(response.attributes.section).to.equal("300");
    expect(response.attributes.securityAlarm).to.equal("301");
    expect(response.attributes.seniorTaxExemption).to.equal("302");
    expect(response.attributes.sewerType).to.equal("303");
    expect(response.attributes.shed).to.equal("304");
    expect(response.attributes.shedSqft).to.equal("305");
    expect(response.attributes.silo).to.equal("306");
    expect(response.attributes.siloSqft).to.equal("307");
    expect(response.attributes.sittingRoom).to.equal("308");
    expect(response.attributes.situsCounty).to.equal("309");
    expect(response.attributes.situsState).to.equal("310");
    expect(response.attributes.soundSystem).to.equal("311");
    expect(response.attributes.sportsCourt).to.equal("312");
    expect(response.attributes.sprinklers).to.equal("313");
    expect(response.attributes.stable).to.equal("314");
    expect(response.attributes.stableSqft).to.equal("315");
    expect(response.attributes.storageBuilding).to.equal("316");
    expect(response.attributes.storageBuildingSqft).to.equal("317");
    expect(response.attributes.storiesNumber).to.equal("318");
    expect(response.attributes.stormShelter).to.equal("319");
    expect(response.attributes.stormShutter).to.equal("320");
    expect(response.attributes.structureStyle).to.equal("321");
    expect(response.attributes.study).to.equal("322");
    expect(response.attributes.subdivision).to.equal("323");
    expect(response.attributes.suffix).to.equal("324");
    expect(response.attributes.suffix2).to.equal("325");
    expect(response.attributes.suffix3).to.equal("326");
    expect(response.attributes.suffix4).to.equal("327");
    expect(response.attributes.sunroom).to.equal("328");
    expect(response.attributes.taxAssessYear).to.equal("329");
    expect(response.attributes.taxBilledAmount).to.equal("330");
    expect(response.attributes.taxDelinquentYear).to.equal("331");
    expect(response.attributes.taxFiscalYear).to.equal("332");
    expect(response.attributes.taxJurisdiction).to.equal("333");
    expect(response.attributes.taxRateArea).to.equal("334");
    expect(response.attributes.tennisCourt).to.equal("335");
    expect(response.attributes.topographyCode).to.equal("336");
    expect(response.attributes.totalMarketValue).to.equal("337");
    expect(response.attributes.township).to.equal("338");
    expect(response.attributes.tractNumber).to.equal("339");
    expect(response.attributes.transferAmount).to.equal("340");
    expect(response.attributes.trustDescription).to.equal("341");
    expect(response.attributes.unitCount).to.equal("342");
    expect(response.attributes.upperFloorsSqft).to.equal("343");
    expect(response.attributes.utility).to.equal("344");
    expect(response.attributes.utilityBuilding).to.equal("345");
    expect(response.attributes.utilityBuildingSqft).to.equal("346");
    expect(response.attributes.utilitySqft).to.equal("347");
    expect(response.attributes.veteranTaxExemption).to.equal("348");
    expect(response.attributes.viewDescription).to.equal("349");
    expect(response.attributes.waterFeature).to.equal("350");
    expect(response.attributes.waterServiceType).to.equal("351");
    expect(response.attributes.wetBar).to.equal("352");
    expect(response.attributes.widowTaxExemption).to.equal("353");
    expect(response.attributes.widthLinearFootage).to.equal("354");
    expect(response.attributes.wineCellar).to.equal("355");
    expect(response.attributes.yearBuilt).to.equal("356");
    expect(response.attributes.zoning).to.equal("357");
  });
});
