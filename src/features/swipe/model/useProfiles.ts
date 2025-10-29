import { getProfiles } from '@/shared/api/profiles'
import { useQuery } from '@tanstack/react-query'

export const useProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}