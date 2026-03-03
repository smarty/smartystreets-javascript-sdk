export interface FinancialHistory {
	codeTitleCompany: string | undefined;
	instrumentDate: string | undefined;
	interestRateType2: string | undefined;
	lenderAddress: string | undefined;
	lenderAddress2: string | undefined;
	lenderCity: string | undefined;
	lenderCity2: string | undefined;
	lenderCode: string | undefined;
	lenderCode2: string | undefined;
	lenderFirstName: string | undefined;
	lenderFirstName2: string | undefined;
	lenderLastName: string | undefined;
	lenderLastName2: string | undefined;
	lenderName: string | undefined;
	lenderName2: string | undefined;
	lenderSellerCarryBack: string | undefined;
	lenderSellerCarryBack2: string | undefined;
	lenderState: string | undefined;
	lenderState2: string | undefined;
	lenderZip: string | undefined;
	lenderZip2: string | undefined;
	lenderZipExtended: string | undefined;
	lenderZipExtended2: string | undefined;
	mortgageAmount: string | undefined;
	mortgageAmount2: string | undefined;
	mortgageDueDate: string | undefined;
	mortgageDueDate2: string | undefined;
	mortgageInterestRate: string | undefined;
	mortgageInterestRateType: string | undefined;
	mortgageLenderCode: string | undefined;
	mortgageRate: string | undefined;
	mortgageRate2: string | undefined;
	mortgageRecordingDate: string | undefined;
	mortgageRecordingDate2: string | undefined;
	mortgageTerm: string | undefined;
	mortgageTerm2: string | undefined;
	mortgageTermType: string | undefined;
	mortgageTermType2: string | undefined;
	mortgageType: string | undefined;
	mortgageType2: string | undefined;
	multiParcelFlag: string | undefined;
	nameTitleCompany: string | undefined;
	recordingDate: string | undefined;
	transferAmount: string | undefined;
}

interface RawFinancialHistory {
	code_title_company?: string;
	instrument_date?: string;
	interest_rate_type_2?: string;
	lender_address?: string;
	lender_address_2?: string;
	lender_city?: string;
	lender_city_2?: string;
	lender_code?: string;
	lender_code_2?: string;
	lender_first_name?: string;
	lender_first_name_2?: string;
	lender_last_name?: string;
	lender_last_name_2?: string;
	lender_name?: string;
	lender_name_2?: string;
	lender_seller_carry_back?: string;
	lender_seller_carry_back_2?: string;
	lender_state?: string;
	lender_state_2?: string;
	lender_zip?: string;
	lender_zip_2?: string;
	lender_zip_extended?: string;
	lender_zip_extended_2?: string;
	mortgage_amount?: string;
	mortgage_amount_2?: string;
	mortgage_due_date?: string;
	mortgage_due_date_2?: string;
	mortgage_interest_rate?: string;
	mortgage_interest_rate_type?: string;
	mortgage_lender_code?: string;
	mortgage_rate?: string;
	mortgage_rate_2?: string;
	mortgage_recording_date?: string;
	mortgage_recording_date_2?: string;
	mortgage_term?: string;
	mortgage_term_2?: string;
	mortgage_term_type?: string;
	mortgage_term_type_2?: string;
	mortgage_type?: string;
	mortgage_type_2?: string;
	multi_parcel_flag?: string;
	name_title_company?: string;
	recording_date?: string;
	transfer_amount?: string;
}

export interface EnrichmentAttributes {
	firstFloorSqft: string | undefined;
	secondFloorSqft: string | undefined;
	acres: string | undefined;
	addressInfoPrivacy: string | undefined;
	airConditioner: string | undefined;
	arborPergola: string | undefined;
	assessedImprovementPercent: string | undefined;
	assessedImprovementValue: string | undefined;
	assessedLandValue: string | undefined;
	assessedValue: string | undefined;
	assessorLastUpdate: string | undefined;
	assessorTaxrollUpdate: string | undefined;
	atticArea: string | undefined;
	atticFlag: string | undefined;
	balcony: string | undefined;
	balconyArea: string | undefined;
	basementSqft: string | undefined;
	basementSqftFinished: string | undefined;
	basementsqftUnfinished: string | undefined;
	bathHouse: string | undefined;
	bathHouseSqft: string | undefined;
	bathroomsPartial: string | undefined;
	bathroomsTotal: string | undefined;
	bedrooms: string | undefined;
	block1: string | undefined;
	block2: string | undefined;
	boatAccess: string | undefined;
	boatHouse: string | undefined;
	boatHouseSqft: string | undefined;
	boatLift: string | undefined;
	bonusRoom: string | undefined;
	breakfastNook: string | undefined;
	breezeway: string | undefined;
	buildingDefinitionCode: string | undefined;
	buildingSqft: string | undefined;
	cabin: string | undefined;
	cabinSqft: string | undefined;
	canopy: string | undefined;
	canopySqft: string | undefined;
	carport: string | undefined;
	carportSqft: string | undefined;
	cbsaCode: string | undefined;
	cbsaName: string | undefined;
	cellar: string | undefined;
	censusBlock: string | undefined;
	censusTract: string | undefined;
	censusBlockGroup: string | undefined;
	censusFipsPlaceCode: string | undefined;
	centralVacuum: string | undefined;
	codeTitleCompany: string | undefined;
	combinedStatisticalArea: string | undefined;
	communityRec: string | undefined;
	companyFlag: string | undefined;
	congressionalDistrict: string | undefined;
	constructionType: string | undefined;
	contactCity: string | undefined;
	contactCrrt: string | undefined;
	contactFullAddress: string | undefined;
	contactHouseNumber: string | undefined;
	contactMailInfoFormat: string | undefined;
	contactMailInfoPrivacy: string | undefined;
	contactMailingCounty: string | undefined;
	contactMailingFips: string | undefined;
	contactPostDirection: string | undefined;
	contactPreDirection: string | undefined;
	contactState: string | undefined;
	contactStreetName: string | undefined;
	contactSuffix: string | undefined;
	contactUnitDesignator: string | undefined;
	contactValue: string | undefined;
	contactZip: string | undefined;
	contactZip4: string | undefined;
	courtyard: string | undefined;
	courtyardArea: string | undefined;
	deck: string | undefined;
	deckArea: string | undefined;
	deedDocumentPage: string | undefined;
	deedDocumentBook: string | undefined;
	deedDocumentNumber: string | undefined;
	deedOwnerFirstName: string | undefined;
	deedOwnerFirstName2: string | undefined;
	deedOwnerFirstName3: string | undefined;
	deedOwnerFirstName4: string | undefined;
	deedOwnerFullName: string | undefined;
	deedOwnerFullName2: string | undefined;
	deedOwnerFullName3: string | undefined;
	deedOwnerFullName4: string | undefined;
	deedOwnerLastName: string | undefined;
	deedOwnerLastName2: string | undefined;
	deedOwnerLastName3: string | undefined;
	deedOwnerLastName4: string | undefined;
	deedOwnerMiddleName: string | undefined;
	deedOwnerMiddleName2: string | undefined;
	deedOwnerMiddleName3: string | undefined;
	deedOwnerMiddleName4: string | undefined;
	deedOwnerSuffix: string | undefined;
	deedOwnerSuffix2: string | undefined;
	deedOwnerSuffix3: string | undefined;
	deedOwnerSuffix4: string | undefined;
	deedSaleDate: string | undefined;
	deedSalePrice: string | undefined;
	deedTransactionId: string | undefined;
	depthLinearFootage: string | undefined;
	disabledTaxExemption: string | undefined;
	drivewaySqft: string | undefined;
	drivewayType: string | undefined;
	effectiveYearBuilt: string | undefined;
	elevationFeet: string | undefined;
	elevator: string | undefined;
	equestrianArena: string | undefined;
	escalator: string | undefined;
	exerciseRoom: string | undefined;
	exteriorWalls: string | undefined;
	familyRoom: string | undefined;
	fence: string | undefined;
	fenceArea: string | undefined;
	fipsCode: string | undefined;
	fireResistanceCode: string | undefined;
	fireSprinklersFlag: string | undefined;
	fireplace: string | undefined;
	fireplaceNumber: string | undefined;
	firstName: string | undefined;
	firstName2: string | undefined;
	firstName3: string | undefined;
	firstName4: string | undefined;
	flooring: string | undefined;
	foundation: string | undefined;
	gameRoom: string | undefined;
	garage: string | undefined;
	garageSqft: string | undefined;
	gazebo: string | undefined;
	gazeboSqft: string | undefined;
	golfCourse: string | undefined;
	grainery: string | undefined;
	grainerySqft: string | undefined;
	greatRoom: string | undefined;
	greenhouse: string | undefined;
	greenhouseSqft: string | undefined;
	grossSqft: string | undefined;
	guesthouse: string | undefined;
	guesthouseSqft: string | undefined;
	handicapAccessibility: string | undefined;
	heat: string | undefined;
	heatFuelType: string | undefined;
	hobbyRoom: string | undefined;
	homeownerTaxExemption: string | undefined;
	instrumentDate: string | undefined;
	intercomSystem: string | undefined;
	interestRateType2: string | undefined;
	interiorStructure: string | undefined;
	kennel: string | undefined;
	kennelSqft: string | undefined;
	landUseCode: string | undefined;
	landUseGroup: string | undefined;
	landUseStandard: string | undefined;
	lastName: string | undefined;
	lastName2: string | undefined;
	lastName3: string | undefined;
	lastName4: string | undefined;
	latitude: string | undefined;
	laundry: string | undefined;
	leanTo: string | undefined;
	leanToSqft: string | undefined;
	legalDescription: string | undefined;
	legalUnit: string | undefined;
	lenderAddress: string | undefined;
	lenderAddress2: string | undefined;
	lenderCity: string | undefined;
	lenderCity2: string | undefined;
	lenderCode: string | undefined;
	lenderCode2: string | undefined;
	lenderFirstName: string | undefined;
	lenderFirstName2: string | undefined;
	lenderLastName: string | undefined;
	lenderLastName2: string | undefined;
	lenderName: string | undefined;
	lenderName2: string | undefined;
	lenderSellerCarryBack: string | undefined;
	lenderSellerCarryBack2: string | undefined;
	lenderState: string | undefined;
	lenderState2: string | undefined;
	lenderZip: string | undefined;
	lenderZip2: string | undefined;
	lenderZipExtended: string | undefined;
	lenderZipExtended2: string | undefined;
	loadingPlatform: string | undefined;
	loadingPlatformSqft: string | undefined;
	longitude: string | undefined;
	lot1: string | undefined;
	lot2: string | undefined;
	lot3: string | undefined;
	lotSqft: string | undefined;
	marketImprovementPercent: string | undefined;
	marketImprovementValue: string | undefined;
	marketLandValue: string | undefined;
	marketValueYear: string | undefined;
	matchType: string | undefined;
	mediaRoom: string | undefined;
	metroDivision: string | undefined;
	middleName: string | undefined;
	middleName2: string | undefined;
	middleName3: string | undefined;
	middleName4: string | undefined;
	milkhouse: string | undefined;
	milkhouseSqft: string | undefined;
	minorCivilDivisionCode: string | undefined;
	minorCivilDivisionName: string | undefined;
	mobileHomeHookup: string | undefined;
	mortgageAmount: string | undefined;
	mortgageAmount2: string | undefined;
	mortgageDueDate: string | undefined;
	mortgageDueDate2: string | undefined;
	mortgageInterestRate: string | undefined;
	mortgageInterestRateType: string | undefined;
	mortgageLenderCode: string | undefined;
	mortgageRate2: string | undefined;
	mortgageRecordingDate: string | undefined;
	mortgageRecordingDate2: string | undefined;
	mortgageTerm: string | undefined;
	mortgageTerm2: string | undefined;
	mortgageTermType: string | undefined;
	mortgageTermType2: string | undefined;
	mortgageType: string | undefined;
	mortgageType2: string | undefined;
	msaCode: string | undefined;
	msaName: string | undefined;
	mudRoom: string | undefined;
	multiParcelFlag: string | undefined;
	nameTitleCompany: string | undefined;
	neighborhoodCode: string | undefined;
	numberOfBuildings: string | undefined;
	office: string | undefined;
	officeSqft: string | undefined;
	otherTaxExemption: string | undefined;
	outdoorKitchenFireplace: string | undefined;
	overheadDoor: string | undefined;
	ownerFullName: string | undefined;
	ownerFullName2: string | undefined;
	ownerFullName3: string | undefined;
	ownerFullName4: string | undefined;
	ownerOccupancyStatus: string | undefined;
	ownershipTransferDate: string | undefined;
	ownershipTransferDocNumber: string | undefined;
	ownershipTransferTransactionId: string | undefined;
	ownershipType: string | undefined;
	ownershipType2: string | undefined;
	ownershipVestingRelationCode: string | undefined;
	parcelAccountNumber: string | undefined;
	parcelMapBook: string | undefined;
	parcelMapPage: string | undefined;
	parcelNumberAlternate: string | undefined;
	parcelNumberFormatted: string | undefined;
	parcelNumberPrevious: string | undefined;
	parcelNumberYearAdded: string | undefined;
	parcelNumberYearChange: string | undefined;
	parcelRawNumber: string | undefined;
	parcelShellRecord: string | undefined;
	parkingSpaces: string | undefined;
	patioArea: string | undefined;
	phaseName: string | undefined;
	plumbingFixturesCount: string | undefined;
	poleStruct: string | undefined;
	poleStructSqft: string | undefined;
	pond: string | undefined;
	pool: string | undefined;
	poolArea: string | undefined;
	poolhouse: string | undefined;
	poolhouseSqft: string | undefined;
	porch: string | undefined;
	porchArea: string | undefined;
	poultryHouse: string | undefined;
	poultryHouseSqft: string | undefined;
	previousAssessedValue: string | undefined;
	priorSaleAmount: string | undefined;
	priorSaleDate: string | undefined;
	propertyAddressCarrierRouteCode: string | undefined;
	propertyAddressCity: string | undefined;
	propertyAddressFull: string | undefined;
	propertyAddressHouseNumber: string | undefined;
	propertyAddressPostDirection: string | undefined;
	propertyAddressPreDirection: string | undefined;
	propertyAddressState: string | undefined;
	propertyAddressStreetName: string | undefined;
	propertyAddressStreetSuffix: string | undefined;
	propertyAddressUnitDesignator: string | undefined;
	propertyAddressUnitValue: string | undefined;
	propertyAddressZip4: string | undefined;
	propertyAddressZipcode: string | undefined;
	publicationDate: string | undefined;
	quarter: string | undefined;
	quarterQuarter: string | undefined;
	quonset: string | undefined;
	quonsetSqft: string | undefined;
	range: string | undefined;
	recordingDate: string | undefined;
	roofCover: string | undefined;
	roofFrame: string | undefined;
	rooms: string | undefined;
	rvParking: string | undefined;
	safeRoom: string | undefined;
	saleAmount: string | undefined;
	saleDate: string | undefined;
	sauna: string | undefined;
	section: string | undefined;
	securityAlarm: string | undefined;
	seniorTaxExemption: string | undefined;
	sewerType: string | undefined;
	shed: string | undefined;
	shedSqft: string | undefined;
	silo: string | undefined;
	siloSqft: string | undefined;
	sittingRoom: string | undefined;
	situsCounty: string | undefined;
	situsState: string | undefined;
	soundSystem: string | undefined;
	sportsCourt: string | undefined;
	sprinklers: string | undefined;
	stable: string | undefined;
	stableSqft: string | undefined;
	storageBuilding: string | undefined;
	storageBuildingSqft: string | undefined;
	storiesNumber: string | undefined;
	stormShelter: string | undefined;
	stormShutter: string | undefined;
	structureStyle: string | undefined;
	study: string | undefined;
	subdivision: string | undefined;
	suffix: string | undefined;
	suffix2: string | undefined;
	suffix3: string | undefined;
	suffix4: string | undefined;
	sunroom: string | undefined;
	taxAssessYear: string | undefined;
	taxBilledAmount: string | undefined;
	taxDelinquentYear: string | undefined;
	taxFiscalYear: string | undefined;
	taxJurisdiction: string | undefined;
	taxRateArea: string | undefined;
	tennisCourt: string | undefined;
	topographyCode: string | undefined;
	totalMarketValue: string | undefined;
	township: string | undefined;
	tractNumber: string | undefined;
	transferAmount: string | undefined;
	trustDescription: string | undefined;
	unitCount: string | undefined;
	upperFloorsSqft: string | undefined;
	utility: string | undefined;
	utilityBuilding: string | undefined;
	utilityBuildingSqft: string | undefined;
	utilitySqft: string | undefined;
	veteranTaxExemption: string | undefined;
	viewDescription: string | undefined;
	waterFeature: string | undefined;
	waterServiceType: string | undefined;
	wetBar: string | undefined;
	widowTaxExemption: string | undefined;
	widthLinearFootage: string | undefined;
	wineCellar: string | undefined;
	financialHistory: FinancialHistory[];
	yearBuilt: string | undefined;
	zoning: string | undefined;
}

interface RawEnrichmentAttributes {
	"1st_floor_sqft"?: string;
	"2nd_floor_sqft"?: string;
	acres?: string;
	address_info_privacy?: string;
	air_conditioner?: string;
	arbor_pergola?: string;
	assessed_improvement_percent?: string;
	assessed_improvement_value?: string;
	assessed_land_value?: string;
	assessed_value?: string;
	assessor_last_update?: string;
	assessor_taxroll_update?: string;
	attic_area?: string;
	attic_flag?: string;
	balcony?: string;
	balcony_area?: string;
	basement_sqft?: string;
	basement_sqft_finished?: string;
	basement_sqft_unfinished?: string;
	bath_house?: string;
	bath_house_sqft?: string;
	bathrooms_partial?: string;
	bathrooms_total?: string;
	bedrooms?: string;
	block_1?: string;
	block_2?: string;
	boat_access?: string;
	boat_house?: string;
	boat_house_sqft?: string;
	boat_lift?: string;
	bonus_room?: string;
	breakfast_nook?: string;
	breezeway?: string;
	building_definition?: string;
	building_sqft?: string;
	cabin?: string;
	cabin_sqft?: string;
	canopy?: string;
	canopy_sqft?: string;
	carport?: string;
	carport_sqft?: string;
	cbsa_code?: string;
	cbsa_name?: string;
	cellar?: string;
	census_block?: string;
	census_tract?: string;
	census_block_group?: string;
	census_fips_place_code?: string;
	central_vacuum?: string;
	code_title_company?: string;
	combined_statistical_area?: string;
	community_rec?: string;
	company_flag?: string;
	congressional_district?: string;
	construction_type?: string;
	contact_city?: string;
	contact_crrt?: string;
	contact_full_address?: string;
	contact_house_number?: string;
	contact_main_info_format?: string;
	contact_mail_info_privacy?: string;
	contact_mailing_county?: string;
	contact_mailing_fips?: string;
	contact_post_direction?: string;
	contact_pre_direction?: string;
	contact_state?: string;
	contact_street_name?: string;
	contact_suffix?: string;
	contact_unit_designator?: string;
	contact_value?: string;
	contact_zip?: string;
	contact_zip4?: string;
	courtyard?: string;
	courtyard_area?: string;
	deck?: string;
	deck_area?: string;
	deed_document_page?: string;
	deed_document_book?: string;
	deed_document_number?: string;
	deed_owner_first_name?: string;
	deed_owner_first_name2?: string;
	deed_owner_first_name3?: string;
	deed_owner_first_name4?: string;
	deed_owner_full_name?: string;
	deed_owner_full_name2?: string;
	deed_owner_full_name3?: string;
	deed_owner_full_name4?: string;
	deed_owner_last_name?: string;
	deed_owner_last_name2?: string;
	deed_owner_last_name3?: string;
	deed_owner_last_name4?: string;
	deed_owner_middle_name?: string;
	deed_owner_middle_name2?: string;
	deed_owner_middle_name3?: string;
	deed_owner_middle_name4?: string;
	deed_owner_suffix?: string;
	deed_owner_suffix2?: string;
	deed_owner_suffix3?: string;
	deed_owner_suffix4?: string;
	deed_sale_date?: string;
	deed_sale_price?: string;
	deed_transaction_id?: string;
	depth_linear_footage?: string;
	disabled_tax_exemption?: string;
	driveway_sqft?: string;
	driveway_type?: string;
	effective_year_built?: string;
	elevation_feet?: string;
	elevator?: string;
	equestrian_arena?: string;
	escalator?: string;
	exercise_room?: string;
	exterior_walls?: string;
	family_room?: string;
	fence?: string;
	fence_area?: string;
	fips_code?: string;
	fire_resistance_code?: string;
	fire_sprinkler_flag?: string;
	fireplace?: string;
	fireplace_number?: string;
	first_name?: string;
	first_name2?: string;
	first_name3?: string;
	first_name4?: string;
	flooring?: string;
	foundation?: string;
	game_room?: string;
	garage?: string;
	garage_sqft?: string;
	gazebo?: string;
	gazebo_sqft?: string;
	golf_course?: string;
	grainery?: string;
	grainery_sqft?: string;
	great_room?: string;
	greenhouse?: string;
	greenhouse_sqft?: string;
	gross_sqft?: string;
	guesthouse?: string;
	guesthouse_sqft?: string;
	handicap_accessibility?: string;
	heat?: string;
	heat_fuel_type?: string;
	hobby_room?: string;
	homeowner_tax_exemption?: string;
	instrument_date?: string;
	intercom_system?: string;
	interest_rate_type_2?: string;
	interior_structure?: string;
	kennel?: string;
	kennel_sqft?: string;
	land_use_code?: string;
	land_use_group?: string;
	land_use_standard?: string;
	last_name?: string;
	last_name_2?: string;
	last_name_3?: string;
	last_name_4?: string;
	latitude?: string;
	laundry?: string;
	lean_to?: string;
	lean_to_sqft?: string;
	legal_description?: string;
	legal_unit?: string;
	lender_address?: string;
	lender_address_2?: string;
	lender_city?: string;
	lender_city_2?: string;
	lender_code?: string;
	lender_code_2?: string;
	lender_first_name?: string;
	lender_first_name_2?: string;
	lender_last_name?: string;
	lender_last_name_2?: string;
	lender_name?: string;
	lender_name_2?: string;
	lender_seller_carry_back?: string;
	lender_seller_carry_back_2?: string;
	lender_state?: string;
	lender_state_2?: string;
	lender_zip?: string;
	lender_zip_2?: string;
	lender_zip_extended?: string;
	lender_zip_extended_2?: string;
	loading_platform?: string;
	loading_platform_sqft?: string;
	longitude?: string;
	lot_1?: string;
	lot_2?: string;
	lot_3?: string;
	lot_sqft?: string;
	market_improvement_percent?: string;
	market_improvement_value?: string;
	market_land_value?: string;
	market_value_year?: string;
	match_type?: string;
	media_room?: string;
	metro_division?: string;
	middle_name?: string;
	middle_name_2?: string;
	middle_name_3?: string;
	middle_name_4?: string;
	milkhouse?: string;
	milkhouse_sqft?: string;
	minor_civil_division_code?: string;
	minor_civil_division_name?: string;
	mobile_home_hookup?: string;
	mortgage_amount?: string;
	mortgage_amount_2?: string;
	mortgage_due_date?: string;
	mortgage_due_date_2?: string;
	mortgage_interest_rate?: string;
	mortgage_interest_rate_type?: string;
	mortgage_lender_code?: string;
	mortgage_rate_2?: string;
	mortgage_recording_date?: string;
	mortgage_recording_date_2?: string;
	mortgage_term?: string;
	mortgage_term_2?: string;
	mortgage_term_type?: string;
	mortgage_term_type_2?: string;
	mortgage_type?: string;
	mortgage_type_2?: string;
	msa_code?: string;
	msa_name?: string;
	mud_room?: string;
	multi_parcel_flag?: string;
	name_title_company?: string;
	neighborhood_code?: string;
	number_of_buildings?: string;
	office?: string;
	office_sqft?: string;
	other_tax_exemption?: string;
	outdoor_kitchen_fireplace?: string;
	overhead_door?: string;
	owner_full_name?: string;
	owner_full_name_2?: string;
	owner_full_name_3?: string;
	owner_full_name_4?: string;
	owner_occupancy_status?: string;
	ownership_transfer_date?: string;
	ownership_transfer_doc_number?: string;
	ownership_transfer_transaction_id?: string;
	ownership_type?: string;
	ownership_type_2?: string;
	ownership_vesting_relation_code?: string;
	parcel_account_number?: string;
	parcel_map_book?: string;
	parcel_map_page?: string;
	parcel_number_alternate?: string;
	parcel_number_formatted?: string;
	parcel_number_previous?: string;
	parcel_number_year_added?: string;
	parcel_number_year_change?: string;
	parcel_raw_number?: string;
	parcel_shell_record?: string;
	parking_spaces?: string;
	patio_area?: string;
	phase_name?: string;
	plumbing_fixtures_count?: string;
	pole_struct?: string;
	pole_struct_sqft?: string;
	pond?: string;
	pool?: string;
	pool_area?: string;
	poolhouse?: string;
	poolhouse_sqft?: string;
	porch?: string;
	porch_area?: string;
	poultry_house?: string;
	poultry_house_sqft?: string;
	previous_assessed_value?: string;
	prior_sale_amount?: string;
	prior_sale_date?: string;
	property_address_carrier_route_code?: string;
	property_address_city?: string;
	property_address_full?: string;
	property_address_house_number?: string;
	property_address_post_direction?: string;
	property_address_pre_direction?: string;
	property_address_state?: string;
	property_address_street_name?: string;
	property_address_street_suffix?: string;
	property_address_unit_designator?: string;
	property_address_unit_value?: string;
	property_address_zip_4?: string;
	property_address_zipcode?: string;
	publication_date?: string;
	quarter?: string;
	quarter_quarter?: string;
	quonset?: string;
	quonset_sqft?: string;
	range?: string;
	recording_date?: string;
	roof_cover?: string;
	roof_frame?: string;
	rooms?: string;
	rv_parking?: string;
	safe_room?: string;
	sale_amount?: string;
	sale_date?: string;
	sauna?: string;
	section?: string;
	security_alarm?: string;
	senior_tax_exemption?: string;
	sewer_type?: string;
	shed?: string;
	shed_sqft?: string;
	silo?: string;
	silo_sqft?: string;
	sitting_room?: string;
	situs_county?: string;
	situs_state?: string;
	sound_system?: string;
	sports_court?: string;
	sprinklers?: string;
	stable?: string;
	stable_sqft?: string;
	storage_building?: string;
	storage_buildling_sqft?: string;
	stories_number?: string;
	storm_shelter?: string;
	storm_shutter?: string;
	structure_style?: string;
	study?: string;
	subdivision?: string;
	suffix?: string;
	suffix_2?: string;
	suffix_3?: string;
	suffix_4?: string;
	sunroom?: string;
	tax_assess_year?: string;
	tax_billed_amount?: string;
	tax_delinquent_year?: string;
	tax_fiscal_year?: string;
	tax_jurisdiction?: string;
	tax_rate_area?: string;
	tennis_court?: string;
	topography_code?: string;
	total_market_value?: string;
	township?: string;
	tract_number?: string;
	transfer_amount?: string;
	trust_description?: string;
	unit_count?: string;
	upper_floors_sqft?: string;
	utility?: string;
	utility_building?: string;
	utility_building_sqft?: string;
	utility_sqft?: string;
	veteran_tax_exemption?: string;
	view_description?: string;
	water_feature?: string;
	water_service_type?: string;
	wet_bar?: string;
	widow_tax_exemption?: string;
	width_linear_footage?: string;
	wine_cellar?: string;
	financial_history?: RawFinancialHistory[];
	year_built?: string;
	zoning?: string;
}

interface RawEnrichmentResponse {
	smarty_key?: string;
	data_set_name?: string;
	data_subset_name?: string;
	attributes?: RawEnrichmentAttributes;
}

export interface FinancialAttributes {
	assessedImprovementPercent: string | undefined;
	assessedImprovementValue: string | undefined;
	assessedLandValue: string | undefined;
	assessedValue: string | undefined;
	assessorLastUpdate: string | undefined;
	assessorTaxrollUpdate: string | undefined;
	contactCity: string | undefined;
	contactCrrt: string | undefined;
	contactFullAddress: string | undefined;
	contactHouseNumber: string | undefined;
	contactMailInfoFormat: string | undefined;
	contactMailInfoPrivacy: string | undefined;
	contactMailingCounty: string | undefined;
	contactMailingFips: string | undefined;
	contactPostDirection: string | undefined;
	contactPreDirection: string | undefined;
	contactState: string | undefined;
	contactStreetName: string | undefined;
	contactSuffix: string | undefined;
	contactUnitDesignator: string | undefined;
	contactValue: string | undefined;
	contactZip: string | undefined;
	contactZip4: string | undefined;
	deedDocumentPage: string | undefined;
	deedDocumentBook: string | undefined;
	deedDocumentNumber: string | undefined;
	deedOwnerFirstName: string | undefined;
	deedOwnerFirstName2: string | undefined;
	deedOwnerFirstName3: string | undefined;
	deedOwnerFirstName4: string | undefined;
	deedOwnerFullName: string | undefined;
	deedOwnerFullName2: string | undefined;
	deedOwnerFullName3: string | undefined;
	deedOwnerFullName4: string | undefined;
	deedOwnerLastName: string | undefined;
	deedOwnerLastName2: string | undefined;
	deedOwnerLastName3: string | undefined;
	deedOwnerLastName4: string | undefined;
	deedOwnerMiddleName: string | undefined;
	deedOwnerMiddleName2: string | undefined;
	deedOwnerMiddleName3: string | undefined;
	deedOwnerMiddleName4: string | undefined;
	deedOwnerSuffix: string | undefined;
	deedOwnerSuffix2: string | undefined;
	deedOwnerSuffix3: string | undefined;
	deedOwnerSuffix4: string | undefined;
	deedSaleDate: string | undefined;
	deedSalePrice: string | undefined;
	deedTransactionId: string | undefined;
	disabledTaxExemption: string | undefined;
	homeownerTaxExemption: string | undefined;
	marketImprovementPercent: string | undefined;
	marketImprovementValue: string | undefined;
	marketLandValue: string | undefined;
	marketValueYear: string | undefined;
	matchType: string | undefined;
	otherTaxExemption: string | undefined;
	ownershipTransferDate: string | undefined;
	ownershipTransferDocNumber: string | undefined;
	ownershipTransferTransactionId: string | undefined;
	ownershipType: string | undefined;
	ownershipType2: string | undefined;
	previousAssessedValue: string | undefined;
	priorSaleAmount: string | undefined;
	priorSaleDate: string | undefined;
	saleAmount: string | undefined;
	saleDate: string | undefined;
	seniorTaxExemption: string | undefined;
	taxAssessYear: string | undefined;
	taxBilledAmount: string | undefined;
	taxDelinquentYear: string | undefined;
	taxFiscalYear: string | undefined;
	taxRateArea: string | undefined;
	totalMarketValue: string | undefined;
	trustDescription: string | undefined;
	veteranTaxExemption: string | undefined;
	widowTaxExemption: string | undefined;
	financialHistory: FinancialHistory[];
}

interface RawFinancialAttributes {
	assessed_improvement_percent?: string;
	assessed_improvement_value?: string;
	assessed_land_value?: string;
	assessed_value?: string;
	assessor_last_update?: string;
	assessor_taxroll_update?: string;
	contact_city?: string;
	contact_crrt?: string;
	contact_full_address?: string;
	contact_house_number?: string;
	contact_main_info_format?: string;
	contact_mail_info_privacy?: string;
	contact_mailing_county?: string;
	contact_mailing_fips?: string;
	contact_post_direction?: string;
	contact_pre_direction?: string;
	contact_state?: string;
	contact_street_name?: string;
	contact_suffix?: string;
	contact_unit_designator?: string;
	contact_value?: string;
	contact_zip?: string;
	contact_zip4?: string;
	deed_document_page?: string;
	deed_document_book?: string;
	deed_document_number?: string;
	deed_owner_first_name?: string;
	deed_owner_first_name2?: string;
	deed_owner_first_name3?: string;
	deed_owner_first_name4?: string;
	deed_owner_full_name?: string;
	deed_owner_full_name2?: string;
	deed_owner_full_name3?: string;
	deed_owner_full_name4?: string;
	deed_owner_last_name?: string;
	deed_owner_last_name2?: string;
	deed_owner_last_name3?: string;
	deed_owner_last_name4?: string;
	deed_owner_middle_name?: string;
	deed_owner_middle_name2?: string;
	deed_owner_middle_name3?: string;
	deed_owner_middle_name4?: string;
	deed_owner_suffix?: string;
	deed_owner_suffix2?: string;
	deed_owner_suffix3?: string;
	deed_owner_suffix4?: string;
	deed_sale_date?: string;
	deed_sale_price?: string;
	deed_transaction_id?: string;
	disabled_tax_exemption?: string;
	homeowner_tax_exemption?: string;
	market_improvement_percent?: string;
	market_improvement_value?: string;
	market_land_value?: string;
	market_value_year?: string;
	match_type?: string;
	other_tax_exemption?: string;
	ownership_transfer_date?: string;
	ownership_transfer_doc_number?: string;
	ownership_transfer_transaction_id?: string;
	ownership_type?: string;
	ownership_type_2?: string;
	previous_assessed_value?: string;
	prior_sale_amount?: string;
	prior_sale_date?: string;
	sale_amount?: string;
	sale_date?: string;
	senior_tax_exemption?: string;
	tax_assess_year?: string;
	tax_billed_amount?: string;
	tax_delinquent_year?: string;
	tax_fiscal_year?: string;
	tax_rate_area?: string;
	total_market_value?: string;
	trust_description?: string;
	veteran_tax_exemption?: string;
	widow_tax_exemption?: string;
	financial_history?: RawFinancialHistory[];
}

interface RawFinancialResponse {
	smarty_key?: string;
	data_set_name?: string;
	data_subset_name?: string;
	attributes?: RawFinancialAttributes;
}

export interface GeoCensusBlock {
	accuracy: string | undefined;
	geoid: string | undefined;
}

export interface GeoCensusCountyDivision {
	accuracy: string | undefined;
	code: string | undefined;
	name: string | undefined;
}

export interface GeoCensusTract {
	code: string | undefined;
}

export interface GeoCoreBasedStatArea {
	code: string | undefined;
	name: string | undefined;
}

export interface GeoPlace {
	accuracy: string | undefined;
	code: string | undefined;
	name: string | undefined;
	type: string | undefined;
}

export interface GeoAttributes {
	censusBlock: GeoCensusBlock;
	censusCountyDivision: GeoCensusCountyDivision;
	censusTract: GeoCensusTract;
	coreBasedStatArea: GeoCoreBasedStatArea;
	place: GeoPlace;
}

interface RawGeoCensusBlock {
	accuracy?: string;
	geoid?: string;
}

interface RawGeoCensusCountyDivision {
	accuracy?: string;
	code?: string;
	name?: string;
}

interface RawGeoCensusTract {
	code?: string;
}

interface RawGeoCoreBasedStatArea {
	code?: string;
	name?: string;
}

interface RawGeoPlace {
	accuracy?: string;
	code?: string;
	name?: string;
	type?: string;
}

interface RawGeoAttributes {
	census_block?: RawGeoCensusBlock;
	census_county_division?: RawGeoCensusCountyDivision;
	census_tract?: RawGeoCensusTract;
	core_based_stat_area?: RawGeoCoreBasedStatArea;
	place?: RawGeoPlace;
}

interface RawGeoResponse {
	smarty_key?: string;
	data_set_name?: string;
	attributes?: RawGeoAttributes;
}

export class Response {
	smartyKey: string;
	dataSetName: string;
	dataSubsetName: string;
	attributes: EnrichmentAttributes;

	constructor(responseData: RawEnrichmentResponse) {
		this.smartyKey = responseData.smarty_key ?? "";
		this.dataSetName = responseData.data_set_name ?? "";
		this.dataSubsetName = responseData.data_subset_name ?? "";

		this.attributes = {} as EnrichmentAttributes;
		if (responseData.attributes) {
			this.attributes.firstFloorSqft = responseData.attributes["1st_floor_sqft"];
			this.attributes.secondFloorSqft = responseData.attributes["2nd_floor_sqft"];
			this.attributes.acres = responseData.attributes.acres;
			this.attributes.addressInfoPrivacy = responseData.attributes.address_info_privacy;
			this.attributes.airConditioner = responseData.attributes.air_conditioner;
			this.attributes.arborPergola = responseData.attributes.arbor_pergola;
			this.attributes.assessedImprovementPercent =
				responseData.attributes.assessed_improvement_percent;
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
			this.attributes.financialHistory = !responseData.attributes.financial_history
				? []
				: responseData.attributes.financial_history.map((history): FinancialHistory => {
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
						};
					});
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
			this.attributes.mortgageInterestRateType =
				responseData.attributes.mortgage_interest_rate_type;
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
			this.attributes.ownershipTransferDocNumber =
				responseData.attributes.ownership_transfer_doc_number;
			this.attributes.ownershipTransferTransactionId =
				responseData.attributes.ownership_transfer_transaction_id;
			this.attributes.ownershipType = responseData.attributes.ownership_type;
			this.attributes.ownershipType2 = responseData.attributes.ownership_type_2;
			this.attributes.ownershipVestingRelationCode =
				responseData.attributes.ownership_vesting_relation_code;
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
			this.attributes.propertyAddressCarrierRouteCode =
				responseData.attributes.property_address_carrier_route_code;
			this.attributes.propertyAddressCity = responseData.attributes.property_address_city;
			this.attributes.propertyAddressFull = responseData.attributes.property_address_full;
			this.attributes.propertyAddressHouseNumber =
				responseData.attributes.property_address_house_number;
			this.attributes.propertyAddressPostDirection =
				responseData.attributes.property_address_post_direction;
			this.attributes.propertyAddressPreDirection =
				responseData.attributes.property_address_pre_direction;
			this.attributes.propertyAddressState = responseData.attributes.property_address_state;
			this.attributes.propertyAddressStreetName =
				responseData.attributes.property_address_street_name;
			this.attributes.propertyAddressStreetSuffix =
				responseData.attributes.property_address_street_suffix;
			this.attributes.propertyAddressUnitDesignator =
				responseData.attributes.property_address_unit_designator;
			this.attributes.propertyAddressUnitValue =
				responseData.attributes.property_address_unit_value;
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
	smartyKey: string;
	dataSetName: string;
	dataSubsetName: string;
	attributes: FinancialAttributes;

	constructor(responseData: RawFinancialResponse) {
		this.smartyKey = responseData.smarty_key ?? "";
		this.dataSetName = responseData.data_set_name ?? "";
		this.dataSubsetName = responseData.data_subset_name ?? "";

		this.attributes = {} as FinancialAttributes;
		if (responseData.attributes) {
			this.attributes.assessedImprovementPercent =
				responseData.attributes.assessed_improvement_percent;
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
			this.attributes.financialHistory = !responseData.attributes.financial_history
				? []
				: responseData.attributes.financial_history.map((history): FinancialHistory => {
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
						};
					});
			this.attributes.homeownerTaxExemption = responseData.attributes.homeowner_tax_exemption;
			this.attributes.marketImprovementPercent = responseData.attributes.market_improvement_percent;
			this.attributes.marketImprovementValue = responseData.attributes.market_improvement_value;
			this.attributes.marketLandValue = responseData.attributes.market_land_value;
			this.attributes.marketValueYear = responseData.attributes.market_value_year;
			this.attributes.matchType = responseData.attributes.match_type;
			this.attributes.otherTaxExemption = responseData.attributes.other_tax_exemption;
			this.attributes.ownershipTransferDate = responseData.attributes.ownership_transfer_date;
			this.attributes.ownershipTransferDocNumber =
				responseData.attributes.ownership_transfer_doc_number;
			this.attributes.ownershipTransferTransactionId =
				responseData.attributes.ownership_transfer_transaction_id;
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
			this.attributes.widowTaxExemption = responseData.attributes.widow_tax_exemption;
		}
	}
}

export class GeoResponse {
	smartyKey: string;
	dataSetName: string;
	attributes: GeoAttributes;

	constructor(responseData: RawGeoResponse) {
		this.smartyKey = responseData.smarty_key ?? "";
		this.dataSetName = responseData.data_set_name ?? "";

		this.attributes = {} as GeoAttributes;
		if (responseData.attributes) {
			const censusBlock: GeoCensusBlock = {} as GeoCensusBlock;
			if (responseData.attributes.census_block) {
				censusBlock.accuracy = responseData.attributes.census_block.accuracy;
				censusBlock.geoid = responseData.attributes.census_block.geoid;
			}
			this.attributes.censusBlock = censusBlock;

			const censusCountyDivision: GeoCensusCountyDivision = {} as GeoCensusCountyDivision;
			if (responseData.attributes.census_county_division) {
				censusCountyDivision.accuracy = responseData.attributes.census_county_division.accuracy;
				censusCountyDivision.code = responseData.attributes.census_county_division.code;
				censusCountyDivision.name = responseData.attributes.census_county_division.name;
			}
			this.attributes.censusCountyDivision = censusCountyDivision;

			const censusTract: GeoCensusTract = {} as GeoCensusTract;
			if (responseData.attributes.census_tract) {
				censusTract.code = responseData.attributes.census_tract.code;
			}
			this.attributes.censusTract = censusTract;

			const coreBasedStatArea: GeoCoreBasedStatArea = {} as GeoCoreBasedStatArea;
			if (responseData.attributes.core_based_stat_area) {
				coreBasedStatArea.code = responseData.attributes.core_based_stat_area.code;
				coreBasedStatArea.name = responseData.attributes.core_based_stat_area.name;
			}
			this.attributes.coreBasedStatArea = coreBasedStatArea;

			const place: GeoPlace = {} as GeoPlace;
			if (responseData.attributes.place) {
				place.accuracy = responseData.attributes.place.accuracy;
				place.code = responseData.attributes.place.code;
				place.name = responseData.attributes.place.name;
				place.type = responseData.attributes.place.type;
			}
			this.attributes.place = place;
		}
	}
}

export default {
	Response,
	FinancialResponse,
	GeoResponse,
};
