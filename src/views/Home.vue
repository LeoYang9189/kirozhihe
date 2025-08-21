<template>
  <div class="pt-16">
    <!-- Hero Banner Section -->
    <HeroBanner />
    
    <!-- Business Quick Navigation -->
    <BusinessQuickNav />
    
    <!-- Advantages Overview -->
    <AdvantagesOverview />
    
    <!-- Data Dashboard -->
    <DataDashboard />
  </div>
</template>

<script>
import HeroBanner from '../components/home/HeroBanner.vue'
import BusinessQuickNav from '../components/home/BusinessQuickNav.vue'
import AdvantagesOverview from '../components/home/AdvantagesOverview.vue'
import DataDashboard from '../components/home/DataDashboard.vue'

export default {
  name: 'Home',
  components: {
    HeroBanner,
    BusinessQuickNav,
    AdvantagesOverview,
    DataDashboard
  }
}
</script>