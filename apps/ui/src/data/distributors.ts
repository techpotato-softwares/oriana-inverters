export type DistributorType = 'Distributor' | 'Certified Installer' | 'Service Center'

export type Distributor = {
  id: string
  name: string
  type: DistributorType
  city: string
  state?: string
  country: string
  region: string
  email?: string
  phone?: string
}

export const staticDistributors: Distributor[] = [
  {
    id: 'solaredge-na-west',
    name: 'SolarEdge Distribution NA',
    type: 'Distributor',
    city: 'San Jose',
    state: 'CA',
    country: 'United States',
    region: 'United States — West',
    email: 'sales@solaredgedist-na.com',
    phone: '+1 (408) 555-0142',
  },
  {
    id: 'greenpower-east',
    name: 'GreenPower Wholesale',
    type: 'Distributor',
    city: 'Atlanta',
    state: 'GA',
    country: 'United States',
    region: 'United States — East',
    email: 'orders@greenpowerwholesale.com',
    phone: '+1 (404) 555-0198',
  },
  {
    id: 'euro-solar',
    name: 'EuroSolar Components',
    type: 'Distributor',
    city: 'Munich',
    country: 'Germany',
    region: 'Europe — DACH',
    email: 'info@eurosolarc.de',
    phone: '+49 89 555 0123',
  },
  {
    id: 'apac-energy',
    name: 'APAC Energy Solutions',
    type: 'Distributor',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Asia Pacific',
    email: 'sales@apacenergy.sg',
    phone: '+65 6123 4567',
  },
  {
    id: 'sunrise-midwest',
    name: 'SunRise Installers',
    type: 'Certified Installer',
    city: 'Chicago',
    state: 'IL',
    country: 'United States',
    region: 'United States — Midwest',
    email: 'projects@sunriseinstallers.com',
    phone: '+1 (312) 555-0167',
  },
  {
    id: 'pacific-renewables',
    name: 'Pacific Renewables',
    type: 'Certified Installer',
    city: 'Sydney',
    state: 'NSW',
    country: 'Australia',
    region: 'Australia & New Zealand',
    email: 'hello@pacificrenewables.com.au',
    phone: '+61 2 5550 1234',
  },
  {
    id: 'lonestar-solar',
    name: 'Lone Star Solar Supply',
    type: 'Distributor',
    city: 'Austin',
    state: 'TX',
    country: 'United States',
    region: 'United States — South',
    email: 'wholesale@lonestarsolar.com',
    phone: '+1 (512) 555-0134',
  },
  {
    id: 'nordic-power',
    name: 'Nordic Power Systems',
    type: 'Distributor',
    city: 'Stockholm',
    country: 'Sweden',
    region: 'Europe — Nordics',
    email: 'order@nordicpower.se',
    phone: '+46 8 555 01234',
  },
  {
    id: 'gulf-energy',
    name: 'Gulf Energy Partners',
    type: 'Certified Installer',
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    email: 'info@gulfenergypartners.ae',
    phone: '+971 4 555 0100',
  },
  {
    id: 'oriana-service-phoenix',
    name: 'Oriana Service Center — Phoenix',
    type: 'Service Center',
    city: 'Phoenix',
    state: 'AZ',
    country: 'United States',
    region: 'United States — Southwest',
    email: 'service.phoenix@orianainverters.com',
    phone: '+1 (602) 555-0189',
  },
  {
    id: 'maple-solar',
    name: 'Maple Solar Distribution',
    type: 'Distributor',
    city: 'Toronto',
    state: 'ON',
    country: 'Canada',
    region: 'Canada',
    email: 'sales@maplesolar.ca',
    phone: '+1 (416) 555-0156',
  },
  {
    id: 'iberia-renewables',
    name: 'Iberia Renewables',
    type: 'Distributor',
    city: 'Madrid',
    country: 'Spain',
    region: 'Europe — Iberia',
    email: 'comercial@iberiarenewables.es',
    phone: '+34 91 555 0123',
  },
]
