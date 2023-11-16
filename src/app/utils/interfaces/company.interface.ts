export interface CompanyProfileI {
  company_status: string;
  address_snippet: string;
  date_of_creation: string;
  matches: {
    title: number[];
  };
  description: string;
  links: {
    self: string;
  };
  company_number: string;
  title: string;
  company_type: string;
  address: {
    premises: string;
    postal_code: string;
    country: string;
    locality: string;
    address_line_1: string;
  };
  kind: 'searchresults#company';
  description_identifier: string[];
}

export interface CompanySearchResponseI {
  page_number: number;
  kind: string;
  total_results: number;
  items: CompanyProfileI[];
}

export interface OfficerProfileI {
  address: {
    premises: string;
    postal_code: string;
    country: string;
    locality: string;
    address_line_1: string;
  };
  name: string;
  appointed_on: string;
  officer_role: string;
  links: {
    officer: {
      appointments: string;
    };
  };
  date_of_birth: {
    month: number;
    year: number;
  };
  occupation: string;
  country_of_residence: string;
  nationality: string;
}

export interface OfficerProfileResponseI {
  etag: string;
  links: {
    self: string;
  };
  kind: string;
  items_per_page: 35;
  items: OfficerProfileI[];
}
