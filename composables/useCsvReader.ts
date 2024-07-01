import { CsvReader } from "~/lib/backend/adapters/readers/csv_reader";

const csvReader = new CsvReader();

export const useCsvReader = () => csvReader;
