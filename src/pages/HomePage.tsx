import { useGetData } from "@/hooks/fetch-data";

const HomePage = () => {
  const { data, isLoading } = useGetData<any>(`companies/get-all`);
  return (
    <div>HomePage</div>
  )
}

export default HomePage