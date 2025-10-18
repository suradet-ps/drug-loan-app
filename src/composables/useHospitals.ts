import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Hospital } from '../types'
import { supabase } from './useSupabase'

const hospitals: Ref<Hospital[] | null> = ref(null)
const loading = ref(false)

export const useHospitals = () => {
  const fetchHospitals = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase.from('hospitals').select('*')
      if (error) throw error
      hospitals.value = data
    } catch (e) {
      console.error('Error fetching hospitals:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    hospitals,
    loading,
    fetchHospitals,
  }
}
