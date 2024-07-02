import { DefaultCsvReader } from "~/lib/backend/adapters/readers/default_csv_reader";

const csvReader = new DefaultCsvReader();

export const useCsvReader = () => csvReader;
