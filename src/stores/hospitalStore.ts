import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Hospital } from '@/types'
import { supabase } from '@/composables/useSupabase'

export const useHospitalStore = defineStore('hospitals', () => {
  const hospitals = ref<Hospital[]>([])
  const loading = ref(false)

  async function fetchHospitals() {
    loading.value = true
    try {
      const { data, error } = await supabase.from('hospitals').select('*').order('name')
      if (error) throw error
      hospitals.value = data || []
    } catch (e) {
      console.error('Error fetching hospitals:', e)
    } finally {
      loading.value = false
    }
  }

  return { hospitals, loading, fetchHospitals }
})
