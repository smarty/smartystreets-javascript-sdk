export class Response {
    constructor(responseData) {
        this.smartyKey = responseData.smarty_key;
        this.dataSetName = responseData.data_set_name;
        this.dataSubsetName = responseData.data_subset_name;

        this.attributes = {};
        if (responseData.attributes) {
            this.attributes.firstFloorSqft = responseData.attributes["1st_floor_sqft"];
            this.attributes.secondFlootSqft = responseData.attributes["2nd_floor_sqft"];
            this.attributes.acres = responseData.attributes.acres;
            this.attributes.addressInfoPrivacy = responseData.attributes.address_info_privacy;
            this.attributes.airConditioner = responseData.attributes.air_conditioner;
            this.attributes.arborPergola = responseData.attributes.arbor_pergola;
            this.attributes.assessedImprovementPercent = responseData.attributes.assessed_improvement_percent;
            this.attributes.assessedImprovementValue = responseData.attributes.assessed_improvement_value;
            this.attributes.assessedLandValue = responseData.attributes.assessed_land_value;
            this.attributes.assessedValue = responseData.attributes.assessed_value;
            this.attributes.assessorLastUpdate = responseData.attributes.assessor_last_update;
            this.attributes.assessorTaxrollUpdate = responseData.attributes.assessor_taxroll_update;
            this.attributes.atticArea = responseData.attributes.attic_area;
            this.attributes.atticFlag = responseData.attributes.attic_flag;
            this.attributes.balcony = responseData.attributes.balcony;
            this.attributes.balconyArea = responseData.attributes.balcony_area;
            this.attributes.basementSqft = responseData.attributes.basement_sqft;
            this.attributes.basementSqftFinished = responseData.attributes.basement_sqft_finished;
            this.attributes.basementsqftUnfinished = responseData.attributes.basement_sqft_unfinished;
            this.attributes.bathHouse = responseData.attributes.bath_house;
            this.attributes.bathHouseSqft = responseData.attributes.bath_house_sqft;
            this.attributes.bathroomsPartial = responseData.attributes.bathrooms_partial;
            this.attributes.bathroomsTotal = responseData.attributes.bathrooms_total;
            this.attributes.bedrooms = responseData.attributes.bedrooms;
            this.attributes.block1 = responseData.attributes.block_1;
            this.attributes.block2 = responseData.attributes.block_2;
            this.attributes.boatAccess = responseData.attributes.boat_access;
            this.attributes.boatHouse = responseData.attributes.boat_house;
            this.attributes.boatHouseSqft = responseData.attributes.boat_house_sqft;
            this.attributes.boatLift = responseData.attributes.boat_lift;
            this.attributes.bonusRoom = responseData.attributes.bonus_room;
            this.attributes.breakfastNook = responseData.attributes.breakfast_nook;
            this.attributes.breezeway = responseData.attributes.breezeway;
            this.attributes.buildingDefinitionCode = responseData.attributes.building_definition;
            this.attributes.buildingSqft = responseData.attributes.building_sqft;
            this.attributes.cabin = responseData.attributes.cabin;
            this.attributes.cabinSqft = responseData.attributes.cabin_sqft;
            this.attributes.canopy = responseData.attributes.canopy;
            this.attributes.canopySqft = responseData.attributes.canopy_sqft;
            this.attributes.carport = responseData.attributes.carport;
            this.attributes.carportSqft = responseData.attributes.carport_sqft;
            this.attributes.cbsaCode = responseData.attributes.cbsa_code;
            this.attributes.cbsaName = responseData.attributes.cbsa_name;
            this.attributes.cellar = responseData.attributes.cellar;
            this.attributes.censusBlock = responseData.attributes.census_block;
            this.attributes.censusTract = responseData.attributes.census_tract;
            this.attributes.censusBlockGroup = responseData.attributes.census_block_group;
            this.attributes.censusFipsPlaceCode = responseData.attributes.census_fips_place_code;
            this.attributes.censusTract = responseData.attributes.census_tract;
            this.attributes.centralVacuum = responseData.attributes.central_vacuum;
            this.attributes.codeTitleCompany = responseData.attributes.code_title_company;
            this.attributes.combinedStatisticalArea = responseData.attributes.combined_statistical_area;
            this.attributes.communityRec = responseData.attributes.community_rec;
            this.attributes.companyFlag = responseData.attributes.company_flag;
            this.attributes.congressionalDistrict = responseData.attributes.congressional_district;
            this.attributes.constructionType = responseData.attributes.construction_type;
            this.attributes.contactCity = responseData.attributes.contact_city;
            this.attributes.contactCrrt = responseData.attributes.contact_crrt;
            this.attributes.contactFullAddress = responseData.attributes.contact_full_address;
            this.attributes.contactHouseNumber = responseData.attributes.contact_house_number;
            this.attributes.contactMailInfoFormat = responseData.attributes.contact_main_info_format;
            this.attributes.contactMailInfoPrivacy = responseData.attributes.contact_mail_info_privacy;
            this.attributes.contactMailingCounty = responseData.attributes.contact_mailing_county;
            this.attributes.contactMailingFips = responseData.attributes.contact_mailing_fips;
            this.attributes.contactPostDirection = responseData.attributes.contact_post_direction;
            this.attributes.contactPreDirection = responseData.attributes.contact_pre_direction;
            this.attributes.contactState = responseData.attributes.contact_state;
            this.attributes.contactStreetName = responseData.attributes.contact_street_name;
            this.attributes.contactSuffix = responseData.attributes.contact_suffix;
            this.attributes.contactUnitDesignator = responseData.attributes.contact_unit_designator;
            this.attributes.contactValue = responseData.attributes.contact_value;
            this.attributes.contactZip = responseData.attributes.contact_zip;
            this.attributes.contactZip4 = responseData.attributes.contact_zip4;
            this.attributes.courtyard = responseData.attributes.courtyard;
            this.attributes.courtyardArea = responseData.attributes.courtyard_area;
            this.attributes.deck = responseData.attributes.deck;
            this.attributes.deckArea = responseData.attributes.deck_area;
            this.attributes.deedDocumentPage = responseData.attributes.deed_document_page;
            this.attributes.deedDocumentBook = responseData.attributes.deed_document_book;
            this.attributes.deedDocumentNumber = responseData.attributes.deed_document_number;
            this.attributes.deedOwnerFirstName = responseData.attributes.deed_owner_first_name;
            this.attributes.deedOwnerFirstName2 = responseData.attributes.deed_owner_first_name2;
            this.attributes.deedOwnerFirstName3 = responseData.attributes.deed_owner_first_name3;
            this.attributes.deedOwnerFirstName4 = responseData.attributes.deed_owner_first_name4;
            this.attributes.deedOwnerFullName = responseData.attributes.deed_owner_full_name;
            this.attributes.deedOwnerFullName2 = responseData.attributes.deed_owner_full_name2;
            this.attributes.deedOwnerFullName3 = responseData.attributes.deed_owner_full_name3;
            this.attributes.deedOwnerFullName4 = responseData.attributes.deed_owner_full_name4;
            this.attributes.deedOwnerLastName = responseData.attributes.deed_owner_last_name;
            this.attributes.deedOwnerLastName2 = responseData.attributes.deed_owner_last_name2;
            this.attributes.deedOwnerLastName3 = responseData.attributes.deed_owner_last_name3;
            this.attributes.deedOwnerLastName4 = responseData.attributes.deed_owner_last_name4;
            this.attributes.deedOwnerMiddleName = responseData.attributes.deed_owner_middle_name;
            this.attributes.deedOwnerMiddleName2 = responseData.attributes.deed_owner_middle_name2;
            this.attributes.deedOwnerMiddleName3 = responseData.attributes.deed_owner_middle_name3;
            this.attributes.deedOwnerMiddleName4 = responseData.attributes.deed_owner_middle_name4;
            this.attributes.deedOwnerSuffix = responseData.attributes.deed_owner_suffix;
            this.attributes.deedOwnerSuffix2 = responseData.attributes.deed_owner_suffix2;
            this.attributes.deedOwnerSuffix3 = responseData.attributes.deed_owner_suffix3;
            this.attributes.deedOwnerSuffix4 = responseData.attributes.deed_owner_suffix4;
            this.attributes.deedSaleDate = responseData.attributes.deed_sale_date;
            this.attributes.deedSalePrice = responseData.attributes.deed_sale_price;
            this.attributes.deedTransactionId = responseData.attributes.deed_transaction_id;
            this.attributes.depthLinearFootage = responseData.attributes.depth_linear_footage;
            this.attributes.disabledTaxExemption = responseData.attributes.disabled_tax_exemption;
            this.attributes.drivewaySqft = responseData.attributes.driveway_sqft;
            this.attributes.drivewayType = responseData.attributes.driveway_type;
            this.attributes.effectiveYearBuilt = responseData.attributes.effective_year_built;
            this.attributes.elevationFeet = responseData.attributes.elevation_feet;
            this.attributes.elevator = responseData.attributes.elevator;
            this.attributes.equestrianArena = responseData.attributes.equestrian_arena;
            this.attributes.escalator = responseData.attributes.escalator;
            this.attributes.exerciseRoom = responseData.attributes.exercise_room;
            this.attributes.exteriorWalls = responseData.attributes.exterior_walls;
            this.attributes.familyRoom = responseData.attributes.family_room;
            this.attributes.fence = responseData.attributes.fence;
            this.attributes.fenceArea = responseData.attributes.fence_area;
            this.attributes.fipsCode = responseData.attributes.fips_code;
            this.attributes.fireResistanceCode = responseData.attributes.fire_resistance_code;
            this.attributes.fireSprinklersFlag = responseData.attributes.fire_sprinkler_flag;
            this.attributes.fireplace = responseData.attributes.fireplace;
            this.attributes.fireplaceNumber = responseData.attributes.fireplace_number;
            this.attributes.firstName = responseData.attributes.first_name;
            this.attributes.firstName2 = responseData.attributes.first_name2;
            this.attributes.firstName3 = responseData.attributes.first_name3;
            this.attributes.firstName4 = responseData.attributes.first_name4;
            this.attributes.flooring = responseData.attributes.flooring;
            this.attributes.foundation = responseData.attributes.foundation;
            this.attributes.gameRoom = responseData.attributes.game_room;
            this.attributes.garage = responseData.attributes.garage;
            this.attributes.garageSqft = responseData.attributes.garage_sqft;
            this.attributes.gazebo = responseData.attributes.gazebo;
            this.attributes.gazeboSqft = responseData.attributes.gazebo_sqft;
            this.attributes.golfCourse = responseData.attributes.golf_course;
            this.attributes.grainery = responseData.attributes.grainery;
            this.attributes.grainerySqft = responseData.attributes.grainery_sqft;
            this.attributes.greatRoom = responseData.attributes.great_room;
            this.attributes.greenhouse = responseData.attributes.greenhouse;
            this.attributes.greenhouseSqft = responseData.attributes.greenhouse_sqft;
            this.attributes.grossSqft = responseData.attributes.gross_sqft;
            this.attributes.guesthouse = responseData.attributes.guesthouse;
            this.attributes.guesthouseSqft = responseData.attributes.guesthouse_sqft;
            this.attributes.handicapAccessibility = responseData.attributes.handicap_accessibility;
            this.attributes.heat = responseData.attributes.heat;
            this.attributes.heatFuelType = responseData.attributes.heat_fuel_type;
            this.attributes.hobbyRoom = responseData.attributes.hobby_room;
            this.attributes.homeownerTaxExemption = responseData.attributes.homeowner_tax_exemption;
            this.attributes.instrumentDate = responseData.attributes.instrument_date;
            this.attributes.intercomSystem = responseData.attributes.intercom_system;
            this.attributes.interestRateType2 = responseData.attributes.interest_rate_type_2;
            this.attributes.interiorStructure = responseData.attributes.interior_structure;
            this.attributes.kennel = responseData.attributes.kennel;
            this.attributes.kennelSqft = responseData.attributes.kennel_sqft;
            this.attributes.landUseCode = responseData.attributes.land_use_code;
            this.attributes.landUseGroup = responseData.attributes.land_use_group;
            this.attributes.landUseStandard = responseData.attributes.land_use_standard;
            this.attributes.lastName = responseData.attributes.last_name;
            this.attributes.lastName2 = responseData.attributes.last_name_2;
            this.attributes.lastName3 = responseData.attributes.last_name_3;
            this.attributes.lastName4 = responseData.attributes.last_name_4;
            this.attributes.latitude = responseData.attributes.latitude;
            this.attributes.laundry = responseData.attributes.laundry;
            this.attributes.leanTo = responseData.attributes.lean_to;
            this.attributes.leanToSqft = responseData.attributes.lean_to_sqft;
            this.attributes.legalDescription = responseData.attributes.legal_description;
            this.attributes.legalUnit = responseData.attributes.legal_unit;
            this.attributes.lenderAddress = responseData.attributes.lender_address;
            this.attributes.lenderAddress2 = responseData.attributes.lender_address_2;
            this.attributes.lenderCity = responseData.attributes.lender_city;
            this.attributes.lenderCity2 = responseData.attributes.lender_city_2;
            this.attributes.lenderCode = responseData.attributes.lender_code;
            this.attributes.lenderCode2 = responseData.attributes.lender_code_2;
            this.attributes.lenderFirstName = responseData.attributes.lender_first_name;
            this.attributes.lenderFirstName2 = responseData.attributes.lender_first_name_2;
            this.attributes.lenderLastName = responseData.attributes.lender_last_name;
            this.attributes.lenderLastName2 = responseData.attributes.lender_last_name_2;
            this.attributes.lenderName = responseData.attributes.lender_name;
            this.attributes.lenderName2 = responseData.attributes.lender_name_2;
            this.attributes.lenderSellerCarryBack = responseData.attributes.lender_seller_carry_back;
            this.attributes.lenderSellerCarryBack2 = responseData.attributes.lender_seller_carry_back_2;
            this.attributes.lenderState = responseData.attributes.lender_state;
            this.attributes.lenderState2 = responseData.attributes.lender_state_2;
            this.attributes.lenderZip = responseData.attributes.lender_zip;
            this.attributes.lenderZip2 = responseData.attributes.lender_zip_2;
            this.attributes.lenderZipExtended = responseData.attributes.lender_zip_extended;
            this.attributes.lenderZipExtended2 = responseData.attributes.lender_zip_extended_2;
            this.attributes.loadingPlatform = responseData.attributes.loading_platform;
            this.attributes.loadingPlatformSqft = responseData.attributes.loading_platform_sqft;
            this.attributes.longitude = responseData.attributes.longitude;
            this.attributes.lot1 = responseData.attributes.lot_1;
            this.attributes.lot2 = responseData.attributes.lot_2;
            this.attributes.lot3 = responseData.attributes.lot_3;
            this.attributes.lotSqft = responseData.attributes.lot_sqft;
            this.attributes.marketImprovementPercent = responseData.attributes.market_improvement_percent;
            this.attributes.marketImprovementValue = responseData.attributes.market_improvement_value;
            this.attributes.marketLandValue = responseData.attributes.market_land_value;
            this.attributes.marketValueYear = responseData.attributes.market_value_year;
            this.attributes.matchType = responseData.attributes.match_type;
            this.attributes.mediaRoom = responseData.attributes.media_room;
            this.attributes.metroDivision = responseData.attributes.metro_division;
            this.attributes.middleName = responseData.attributes.middle_name;
            this.attributes.middleName2 = responseData.attributes.middle_name_2;
            this.attributes.middleName3 = responseData.attributes.middle_name_3;
            this.attributes.middleName4 = responseData.attributes.middle_name_4;
            this.attributes.milkhouse = responseData.attributes.milkhouse;
            this.attributes.milkhouseSqft = responseData.attributes.milkhouse_sqft;
            this.attributes.minorCivilDivisionCode = responseData.attributes.minor_civil_division_code;
            this.attributes.minorCivilDivisionName = responseData.attributes.minor_civil_division_name;
            this.attributes.mobileHomeHookup = responseData.attributes.mobile_home_hookup;
            this.attributes.mortgageAmount = responseData.attributes.mortgage_amount;
            this.attributes.mortgageAmount2 = responseData.attributes.mortgage_amount_2;
            this.attributes.mortgageDueDate = responseData.attributes.mortgage_due_date;
            this.attributes.mortgageDueDate2 = responseData.attributes.mortgage_due_date_2;
            this.attributes.mortgageInterestRate = responseData.attributes.mortgage_interest_rate;
            this.attributes.mortgageInterestRateType = responseData.attributes.mortgage_interest_rate_type;
            this.attributes.mortgageLenderCode = responseData.attributes.mortgage_lender_code;
            this.attributes.mortgageRate2 = responseData.attributes.mortgage_rate_2;
            this.attributes.mortgageRecordingDate = responseData.attributes.mortgage_recording_date;
            this.attributes.mortgageRecordingDate2 = responseData.attributes.mortgage_recording_date_2;
            this.attributes.mortgageTerm = responseData.attributes.mortgage_term;
            this.attributes.mortgageTerm2 = responseData.attributes.mortgage_term_2;
            this.attributes.mortgageTermType = responseData.attributes.mortgage_term_type;
            this.attributes.mortgageTermType2 = responseData.attributes.mortgage_term_type_2;
            this.attributes.mortgageType = responseData.attributes.mortgage_type;
            this.attributes.mortgageType2 = responseData.attributes.mortgage_type_2;
            this.attributes.msaCode = responseData.attributes.msa_code;
            this.attributes.msaName = responseData.attributes.msa_name;
            this.attributes.mudRoom = responseData.attributes.mud_room;
            this.attributes.multiParcelFlag = responseData.attributes.multi_parcel_flag;
            this.attributes.nameTitleCompany = responseData.attributes.name_title_company;
            this.attributes.neighborhoodCode = responseData.attributes.neighborhood_code;
            this.attributes.numberOfBuildings = responseData.attributes.number_of_buildings;
            this.attributes.office = responseData.attributes.office;
            this.attributes.officeSqft = responseData.attributes.office_sqft;
            this.attributes.otherTaxExemption = responseData.attributes.other_tax_exemption;
            this.attributes.outdoorKitchenFireplace = responseData.attributes.outdoor_kitchen_fireplace;
            this.attributes.overheadDoor = responseData.attributes.overhead_door;
            this.attributes.ownerFullName = responseData.attributes.owner_full_name;
            this.attributes.ownerFullName2 = responseData.attributes.owner_full_name_2;
            this.attributes.ownerFullName3 = responseData.attributes.owner_full_name_3;
            this.attributes.ownerFullName4 = responseData.attributes.owner_full_name_4;
            this.attributes.ownerOccupancyStatus = responseData.attributes.owner_occupancy_status;
            this.attributes.ownershipTransferDate = responseData.attributes.ownership_transfer_date;
            this.attributes.ownershipTransferDocNumber = responseData.attributes.ownership_transfer_doc_number;
            this.attributes.ownershipTransferTransactionId = responseData.attributes.ownership_transfer_transaction_id;
            this.attributes.ownershipType = responseData.attributes.ownership_type;
            this.attributes.ownershipType2 = responseData.attributes.ownership_type_2;
            this.attributes.ownershipVestingRelationCode = responseData.attributes.ownership_vesting_relation_code;
            this.attributes.parcelAccountNumber = responseData.attributes.parcel_account_number;
            this.attributes.parcelMapBook = responseData.attributes.parcel_map_book;
            this.attributes.parcelMapPage = responseData.attributes.parcel_map_page;
            this.attributes.parcelNumberAlternate = responseData.attributes.parcel_number_alternate;
            this.attributes.parcelNumberFormatted = responseData.attributes.parcel_number_formatted;
            this.attributes.parcelNumberPrevious = responseData.attributes.parcel_number_previous;
            this.attributes.parcelNumberYearAdded = responseData.attributes.parcel_number_year_added;
            this.attributes.parcelNumberYearChange = responseData.attributes.parcel_number_year_change;
            this.attributes.parcelRawNumber = responseData.attributes.parcel_raw_number;
            this.attributes.parcelShellRecord = responseData.attributes.parcel_shell_record;
            this.attributes.parkingSpaces = responseData.attributes.parking_spaces;
            this.attributes.patioArea = responseData.attributes.patio_area;
            this.attributes.phaseName = responseData.attributes.phase_name;
            this.attributes.plumbingFixturesCount = responseData.attributes.plumbing_fixtures_count;
            this.attributes.poleStruct = responseData.attributes.pole_struct;
            this.attributes.poleStructSqft = responseData.attributes.pole_struct_sqft;
            this.attributes.pond = responseData.attributes.pond;
            this.attributes.pool = responseData.attributes.pool;
            this.attributes.poolArea = responseData.attributes.pool_area;
            this.attributes.poolhouse = responseData.attributes.poolhouse;
            this.attributes.poolhouseSqft = responseData.attributes.poolhouse_sqft;
            this.attributes.porch = responseData.attributes.porch;
            this.attributes.porchArea = responseData.attributes.porch_area;
            this.attributes.poultryHouse = responseData.attributes.poultry_house;
            this.attributes.poultryHouseSqft = responseData.attributes.poultry_house_sqft;
            this.attributes.previousAssessedValue = responseData.attributes.previous_assessed_value;
            this.attributes.priorSaleAmount = responseData.attributes.prior_sale_amount;
            this.attributes.priorSaleDate = responseData.attributes.prior_sale_date;
            this.attributes.propertyAddressCarrierRouteCode = responseData.attributes.property_address_carrier_route_code;
            this.attributes.propertyAddressCity = responseData.attributes.property_address_city;
            this.attributes.propertyAddressFull = responseData.attributes.property_address_full;
            this.attributes.propertyAddressHouseNumber = responseData.attributes.property_address_house_number;
            this.attributes.propertyAddressPostDirection = responseData.attributes.property_address_post_direction;
            this.attributes.propertyAddressPreDirection = responseData.attributes.property_address_pre_direction;
            this.attributes.propertyAddressState = responseData.attributes.property_address_state;
            this.attributes.propertyAddressStreetName = responseData.attributes.property_address_street_name;
            this.attributes.propertyAddressStreetSuffix = responseData.attributes.property_address_street_suffix;
            this.attributes.propertyAddressUnitDesignator = responseData.attributes.property_address_unit_designator;
            this.attributes.propertyAddressUnitValue = responseData.attributes.property_address_unit_value;
            this.attributes.propertyAddressZip4 = responseData.attributes.property_address_zip_4;
            this.attributes.propertyAddressZipcode = responseData.attributes.property_address_zipcode;
            this.attributes.publicationDate = responseData.attributes.publication_date;
            this.attributes.quarter = responseData.attributes.quarter;
            this.attributes.quarterQuarter = responseData.attributes.quarter_quarter;
            this.attributes.quonset = responseData.attributes.quonset;
            this.attributes.quonsetSqft = responseData.attributes.quonset_sqft;
            this.attributes.range = responseData.attributes.range;
            this.attributes.recordingDate = responseData.attributes.recording_date;
            this.attributes.roofCover = responseData.attributes.roof_cover;
            this.attributes.roofFrame = responseData.attributes.roof_frame;
            this.attributes.rooms = responseData.attributes.rooms;
            this.attributes.rvParking = responseData.attributes.rv_parking;
            this.attributes.safeRoom = responseData.attributes.safe_room;
            this.attributes.saleAmount = responseData.attributes.sale_amount;
            this.attributes.saleDate = responseData.attributes.sale_date;
            this.attributes.sauna = responseData.attributes.sauna;
            this.attributes.section = responseData.attributes.section;
            this.attributes.securityAlarm = responseData.attributes.security_alarm;
            this.attributes.seniorTaxExemption = responseData.attributes.senior_tax_exemption;
            this.attributes.sewerType = responseData.attributes.sewer_type;
            this.attributes.shed = responseData.attributes.shed;
            this.attributes.shedSqft = responseData.attributes.shed_sqft;
            this.attributes.silo = responseData.attributes.silo;
            this.attributes.siloSqft = responseData.attributes.silo_sqft;
            this.attributes.sittingRoom = responseData.attributes.sitting_room;
            this.attributes.situsCounty = responseData.attributes.situs_county;
            this.attributes.situsState = responseData.attributes.situs_state;
            this.attributes.soundSystem = responseData.attributes.sound_system;
            this.attributes.sportsCourt = responseData.attributes.sports_court;
            this.attributes.sprinklers = responseData.attributes.sprinklers;
            this.attributes.stable = responseData.attributes.stable;
            this.attributes.stableSqft = responseData.attributes.stable_sqft;
            this.attributes.storageBuilding = responseData.attributes.storage_building;
            this.attributes.storageBuildingSqft = responseData.attributes.storage_buildling_sqft;
            this.attributes.storiesNumber = responseData.attributes.stories_number;
            this.attributes.stormShelter = responseData.attributes.storm_shelter;
            this.attributes.stormShutter = responseData.attributes.storm_shutter;
            this.attributes.structureStyle = responseData.attributes.structure_style;
            this.attributes.study = responseData.attributes.study;
            this.attributes.subdivision = responseData.attributes.subdivision;
            this.attributes.suffix = responseData.attributes.suffix;
            this.attributes.suffix2 = responseData.attributes.suffix_2;
            this.attributes.suffix3 = responseData.attributes.suffix_3;
            this.attributes.suffix4 = responseData.attributes.suffix_4;
            this.attributes.sunroom = responseData.attributes.sunroom;
            this.attributes.taxAssessYear = responseData.attributes.tax_assess_year;
            this.attributes.taxBilledAmount = responseData.attributes.tax_billed_amount;
            this.attributes.taxDelinquentYear = responseData.attributes.tax_delinquent_year;
            this.attributes.taxFiscalYear = responseData.attributes.tax_fiscal_year;
            this.attributes.taxJurisdiction = responseData.attributes.tax_jurisdiction;
            this.attributes.taxRateArea = responseData.attributes.tax_rate_area;
            this.attributes.tennisCourt = responseData.attributes.tennis_court;
            this.attributes.topographyCode = responseData.attributes.topography_code;
            this.attributes.totalMarketValue = responseData.attributes.total_market_value;
            this.attributes.township = responseData.attributes.township;
            this.attributes.tractNumber = responseData.attributes.tract_number;
            this.attributes.transferAmount = responseData.attributes.transfer_amount;
            this.attributes.trustDescription = responseData.attributes.trust_description;
            this.attributes.unitCount = responseData.attributes.unit_count;
            this.attributes.upperFloorsSqft = responseData.attributes.upper_floors_sqft;
            this.attributes.utility = responseData.attributes.utility;
            this.attributes.utilityBuilding = responseData.attributes.utility_building;
            this.attributes.utilityBuildingSqft = responseData.attributes.utility_building_sqft;
            this.attributes.utilitySqft = responseData.attributes.utility_sqft;
            this.attributes.veteranTaxExemption = responseData.attributes.veteran_tax_exemption;
            this.attributes.viewDescription = responseData.attributes.view_description;
            this.attributes.waterFeature = responseData.attributes.water_feature;
            this.attributes.waterServiceType = responseData.attributes.water_service_type;
            this.attributes.wetBar = responseData.attributes.wet_bar;
            this.attributes.widowTaxExemption = responseData.attributes.widow_tax_exemption;
            this.attributes.widthLinearFootage = responseData.attributes.width_linear_footage;
            this.attributes.wineCellar = responseData.attributes.wine_cellar;
            this.attributes.yearBuilt = responseData.attributes.year_built;
            this.attributes.zoning = responseData.attributes.zoning;
        }
    }
}

export class FinancialResponse {
    constructor(responseData) {
        this.smartyKey = responseData.smarty_key;
        this.dataSetName = responseData.data_set_name;
        this.dataSubsetName = responseData.data_subset_name;

        this.attributes = {};
        if (responseData.attributes) {
            this.attributes.assessedImprovementPercent = responseData.attributes.assessed_improvement_percent;
            this.attributes.assessedImprovementValue = responseData.attributes.assessed_improvement_value;
            this.attributes.assessedLandValue = responseData.attributes.assessed_land_value;
            this.attributes.assessedValue = responseData.attributes.assessed_value;
            this.attributes.assessorLastUpdate = responseData.attributes.assessor_last_update;
            this.attributes.assessorTaxrollUpdate = responseData.attributes.assessor_taxroll_update;
            this.attributes.contactCity = responseData.attributes.contact_city;
            this.attributes.contactCrrt = responseData.attributes.contact_crrt;
            this.attributes.contactFullAddress = responseData.attributes.contact_full_address;
            this.attributes.contactHouseNumber = responseData.attributes.contact_house_number;
            this.attributes.contactMailInfoFormat = responseData.attributes.contact_main_info_format;
            this.attributes.contactMailInfoPrivacy = responseData.attributes.contact_mail_info_privacy;
            this.attributes.contactMailingCounty = responseData.attributes.contact_mailing_county;
            this.attributes.contactMailingFips = responseData.attributes.contact_mailing_fips;
            this.attributes.contactPostDirection = responseData.attributes.contact_post_direction;
            this.attributes.contactPreDirection = responseData.attributes.contact_pre_direction;
            this.attributes.contactState = responseData.attributes.contact_state;
            this.attributes.contactStreetName = responseData.attributes.contact_street_name;
            this.attributes.contactSuffix = responseData.attributes.contact_suffix;
            this.attributes.contactUnitDesignator = responseData.attributes.contact_unit_designator;
            this.attributes.contactValue = responseData.attributes.contact_value;
            this.attributes.contactZip = responseData.attributes.contact_zip;
            this.attributes.contactZip4 = responseData.attributes.contact_zip4;
            this.attributes.deedDocumentPage = responseData.attributes.deed_document_page;
            this.attributes.deedDocumentBook = responseData.attributes.deed_document_book;
            this.attributes.deedDocumentNumber = responseData.attributes.deed_document_number;
            this.attributes.deedOwnerFirstName = responseData.attributes.deed_owner_first_name;
            this.attributes.deedOwnerFirstName2 = responseData.attributes.deed_owner_first_name2;
            this.attributes.deedOwnerFirstName3 = responseData.attributes.deed_owner_first_name3;
            this.attributes.deedOwnerFirstName4 = responseData.attributes.deed_owner_first_name4;
            this.attributes.deedOwnerFullName = responseData.attributes.deed_owner_full_name;
            this.attributes.deedOwnerFullName2 = responseData.attributes.deed_owner_full_name2;
            this.attributes.deedOwnerFullName3 = responseData.attributes.deed_owner_full_name3;
            this.attributes.deedOwnerFullName4 = responseData.attributes.deed_owner_full_name4;
            this.attributes.deedOwnerLastName = responseData.attributes.deed_owner_last_name;
            this.attributes.deedOwnerLastName2 = responseData.attributes.deed_owner_last_name2;
            this.attributes.deedOwnerLastName3 = responseData.attributes.deed_owner_last_name3;
            this.attributes.deedOwnerLastName4 = responseData.attributes.deed_owner_last_name4;
            this.attributes.deedOwnerMiddleName = responseData.attributes.deed_owner_middle_name;
            this.attributes.deedOwnerMiddleName2 = responseData.attributes.deed_owner_middle_name2;
            this.attributes.deedOwnerMiddleName3 = responseData.attributes.deed_owner_middle_name3;
            this.attributes.deedOwnerMiddleName4 = responseData.attributes.deed_owner_middle_name4;
            this.attributes.deedOwnerSuffix = responseData.attributes.deed_owner_suffix;
            this.attributes.deedOwnerSuffix2 = responseData.attributes.deed_owner_suffix2;
            this.attributes.deedOwnerSuffix3 = responseData.attributes.deed_owner_suffix3;
            this.attributes.deedOwnerSuffix4 = responseData.attributes.deed_owner_suffix4;
            this.attributes.deedSaleDate = responseData.attributes.deed_sale_date;
            this.attributes.deedSalePrice = responseData.attributes.deed_sale_price;
            this.attributes.deedTransactionId = responseData.attributes.deed_transaction_id;
            this.attributes.disabledTaxExemption = responseData.attributes.disabled_tax_exemption;

            this.attributes.financialHistory = !responseData.attributes.financial_history ? [] : responseData.attributes.financial_history.map(history => {
                return {
                    codeTitleCompany: history.code_title_company,
                    instrumentDate: history.instrument_date,
                    interestRateType2: history.interest_rate_type_2,
                    lenderAddress: history.lender_address,
                    lenderAddress2: history.lender_address_2,
                    lenderCity: history.lender_city,
                    lenderCity2: history.lender_city_2,
                    lenderCode: history.lender_code,
                    lenderCode2: history.lender_code_2,
                    lenderFirstName: history.lender_first_name,
                    lenderFirstName2: history.lender_first_name_2,
                    lenderLastName: history.lender_last_name,
                    lenderLastName2: history.lender_last_name_2,
                    lenderName: history.lender_name,
                    lenderName2: history.lender_name_2,
                    lenderSellerCarryBack: history.lender_seller_carry_back,
                    lenderSellerCarryBack2: history.lender_seller_carry_back_2,
                    lenderState: history.lender_state,
                    lenderState2: history.lender_state_2,
                    lenderZip: history.lender_zip,
                    lenderZip2: history.lender_zip_2,
                    lenderZipExtended: history.lender_zip_extended,
                    lenderZipExtended2: history.lender_zip_extended_2,
                    mortgageAmount: history.mortgage_amount,
                    mortgageAmount2: history.mortgage_amount_2,
                    mortgageDueDate: history.mortgage_due_date,
                    mortgageDueDate2: history.mortgage_due_date_2,
                    mortgageInterestRate: history.mortgage_interest_rate,
                    mortgageInterestRateType: history.mortgage_interest_rate_type,
                    mortgageLenderCode: history.mortgage_lender_code,
                    mortgageRate: history.mortgage_rate,
                    mortgageRate2: history.mortgage_rate_2,
                    mortgageRecordingDate: history.mortgage_recording_date,
                    mortgageRecordingDate2: history.mortgage_recording_date_2,
                    mortgageTerm: history.mortgage_term,
                    mortgageTerm2: history.mortgage_term_2,
                    mortgageTermType: history.mortgage_term_type,
                    mortgageTermType2: history.mortgage_term_type_2,
                    mortgageType: history.mortgage_type,
                    mortgageType2: history.mortgage_type_2,
                    multiParcelFlag: history.multi_parcel_flag,
                    nameTitleCompany: history.name_title_company,
                    recordingDate: history.recording_date,
                    transferAmount: history.transfer_amount,
                }
            })
            this.attributes.homeownerTaxExemption = responseData.attributes.homeowner_tax_exemption;
            this.attributes.marketImprovementPercent = responseData.attributes.market_improvement_percent;
            this.attributes.marketImprovementValue = responseData.attributes.market_improvement_value;
            this.attributes.marketLandValue = responseData.attributes.market_land_value;
            this.attributes.marketValueYear = responseData.attributes.market_value_year;
            this.attributes.matchType = responseData.attributes.match_type;
            this.attributes.otherTaxExemption = responseData.attributes.other_tax_exemption;
            this.attributes.ownershipTransferDate = responseData.attributes.ownership_transfer_date;
            this.attributes.ownershipTransferDocNumber = responseData.attributes.ownership_transfer_doc_number;
            this.attributes.ownershipTransferTransactionId = responseData.attributes.ownership_transfer_transaction_id;
            this.attributes.ownershipType = responseData.attributes.ownership_type;
            this.attributes.ownershipType2 = responseData.attributes.ownership_type_2;
            this.attributes.previousAssessedValue = responseData.attributes.previous_assessed_value;
            this.attributes.priorSaleAmount = responseData.attributes.prior_sale_amount;
            this.attributes.priorSaleDate = responseData.attributes.prior_sale_date;
            this.attributes.saleAmount = responseData.attributes.sale_amount;
            this.attributes.saleDate = responseData.attributes.sale_date;
            this.attributes.seniorTaxExemption = responseData.attributes.senior_tax_exemption;
            this.attributes.taxAssessYear = responseData.attributes.tax_assess_year;
            this.attributes.taxBilledAmount = responseData.attributes.tax_billed_amount;
            this.attributes.taxDelinquentYear = responseData.attributes.tax_delinquent_year;
            this.attributes.taxFiscalYear = responseData.attributes.tax_fiscal_year;
            this.attributes.taxRateArea = responseData.attributes.tax_rate_area;
            this.attributes.totalMarketValue = responseData.attributes.total_market_value;
            this.attributes.trustDescription = responseData.attributes.trust_description;
            this.attributes.veteranTaxExemption = responseData.attributes.veteran_tax_exemption;
            this.attributes.widow_tax_exemption = responseData.attributes.widow_tax_exemption;
        }
    }
}

export class GeoResponse {
    constructor(responseData) {
        this.smartyKey = responseData.smarty_key;
        this.dataSetName = responseData.data_set_name;

        this.attributes = {};
        if (responseData.attributes) {
            this.attributes.censusBlock = {};
            if (responseData.attributes.census_block) {
                this.attributes.censusBlock.accuracy = responseData.attributes.census_block.accuracy;
                this.attributes.censusBlock.geoid = responseData.attributes.census_block.geoid;
            }

            this.attributes.censusCountyDivision = {};
            if (responseData.attributes.census_county_division) {
                this.attributes.censusCountyDivision.accuracy = responseData.attributes.census_county_division.accuracy;
                this.attributes.censusCountyDivision.code = responseData.attributes.census_county_division.code;
                this.attributes.censusCountyDivision.name = responseData.attributes.census_county_division.name;
            }

            this.attributes.censusTract = {};
            if (responseData.attributes.census_tract) {
                this.attributes.censusTract.code = responseData.attributes.census_tract.code;
            }

            this.attributes.coreBasedStatArea = {};
            if (responseData.attributes.core_based_stat_area) {
                this.attributes.coreBasedStatArea.code = responseData.attributes.core_based_stat_area.code;
                this.attributes.coreBasedStatArea.name = responseData.attributes.core_based_stat_area.name;
            }

            this.attributes.place = {};
            if (responseData.attributes.place) {
                this.attributes.place.accuracy = responseData.attributes.place.accuracy;
                this.attributes.place.code = responseData.attributes.place.code;
                this.attributes.place.name = responseData.attributes.place.name;
                this.attributes.place.type = responseData.attributes.place.type;
            }
        }
    }
}
