import { ExampleWindowProps } from './types';
import React, { useState } from 'react';
import { Company } from '../types';
import { MosaicWindow } from 'react-mosaic-component';
import { additionalControls, EMPTY_ARRAY } from './utils';

export const SampleWindow = ({ count, companies, path, totalWindowCount }: ExampleWindowProps) => {
  const [selectedCompany, setSelectedCompany] = useState<Company>(companies[0]);
  const adContainer = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (adContainer.current == null) {
      return;
    }

    const script = document.createElement('script');

    script.src = '//cdn.carbonads.com/carbon.js?serve=CEAIEK3E&placement=nomcoptergithubio';
    script.async = true;
    script.type = 'text/javascript';
    script.id = '_carbonads_js';

    // adContainer.current.appendChild(script);
  }, []);

  const findCompanyById = (id: string) => {
    const company = companies.find((c) => c.id === id);
    if (!company) {
      return companies[0];
    }
    return company;
  };

  return (
    <MosaicWindow<number>
      additionalControls={count === 3 ? additionalControls : EMPTY_ARRAY}
      title={`Window ${count}`}
      createNode={() => totalWindowCount + 1}
      path={path}
      onDragStart={() => console.log('MosaicWindow.onDragStart')}
      onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
      renderToolbar={() => (
        <div className="toolbar-example">
          <div style={{ whiteSpace: 'nowrap' }}>Company Info</div>
          <select defaultValue={companies[0].id} onChange={(e) => setSelectedCompany(findCompanyById(e.target.value))}>
            <option value="">Select company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
      )}
    >
      <div className="example-window">
        <p>Ticker: {selectedCompany.ticker}</p>
        <p>Name: {selectedCompany.name}</p>
        <p>Legal Name: {selectedCompany.legal_name}</p>
        <p>Legal Name: {selectedCompany.legal_name}</p>
        <p>Stock Exchange: {selectedCompany.stock_exchange}</p>
        <p>Short Description: {selectedCompany.short_description}</p>
        <p>Long Description: {selectedCompany.long_description}</p>
        <p>Web: {selectedCompany.company_url}</p>
        <p>Business Address: {selectedCompany.business_address}</p>
        <p>Entity legal form: {selectedCompany.entity_legal_form}</p>
        <p>Latest filling date: {selectedCompany.latest_filing_date}</p>
        <p>Inc country: {selectedCompany.inc_country}</p>
        <p>Employees: {selectedCompany.employees}</p>
        {count === 3 && <div className="ad-container" ref={adContainer} />}
      </div>
    </MosaicWindow>
  );
};
