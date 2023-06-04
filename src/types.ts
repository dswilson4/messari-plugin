export interface ContractAddress {
    platform: string;
    contract_address: string;
    }
    
    export interface SourceAttribution {
    name: string;
    url: string;
    }
    
    export interface Params {
    asset_key: string;
    asset_id: string;
    start: string;
    end: string;
    interval: string;
    order: string;
    format: string;
    timestamp_format: string;
    columns: string[];
    }
    
    export interface Schema {
    metric_id: string;
    name: string;
    description: string;
    values_schema: Record<string, string>;
    minimum_interval: string;
    source_attribution: SourceAttribution[];
    }
    
    
    export interface TimeSeriesData {
    id: string;
    serial_id: number;
    symbol: string;
    name: string;
    slug: string;
    contract_addresses: ContractAddress[];
    _internal_temp_agora_id: string;
    parameters: Params;
    schema: Schema;
    values: number[][];
    }
    
    export interface Status {
        elapsed: number;
        timestamp: string;
      }
    
    export interface TimeSeriesResponse {
    status: Status;
    data: TimeSeriesData;
    }
    