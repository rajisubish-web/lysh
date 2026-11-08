import { Building2, Sofa, Sparkles, ShieldCheck } from 'lucide-react'
export const NAV = [['Home','#home'],['Our Approach','#approach'],['For Guests','#guests'],['For Landlords','#landlords'],['About Us','#about'],['Contact','#contact']]
// Stock photos for layout only. Replace with LYSH Living photography.
export const IMG = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`
export const HERO_IMG = '1502672260266-1c1ef2d93688'
export const APPROACH = [
  { icon: Building2, title: 'Thoughtfully Selected Properties', text: 'Every home is chosen for its location, layout and quality.' },
  { icon: Sofa, title: 'Beautifully Designed Interiors', text: 'Considered furnishings and finishes that feel calm and complete.' },
  { icon: Sparkles, title: 'Exceptional Guest Experience', text: 'Clear communication and attentive care from booking to check-out.' },
  { icon: ShieldCheck, title: 'Professional Property Management', text: 'Reliable, transparent management that protects your investment.' },
]
// DUMMY CONTENT. To add a property, copy one object and edit it. Remove `sample: true` once the details are real.
const H = ['Fully equipped kitchen', 'High-speed Wi-Fi and dedicated workspace', 'Weekly housekeeping included']
export const PROPERTIES = [
  { name: 'The Wharf Residence', location: 'Canary Wharf, London', image: '1560448204-e02f11c3d0e2', sample: true, beds: 2, guests: 4, price: '£165',
    blurb: 'A bright two-bedroom apartment with floor-to-ceiling windows, moments from the river and the Underground. Ideal for business stays and relocations.', highlights: H },
  { name: 'Jewellery Quarter Loft', location: 'Birmingham', image: '1522708323590-d24dbb6b0267', sample: true, beds: 1, guests: 2, price: '£110',
    blurb: 'A characterful loft in a converted warehouse, finished with warm timber, soft lighting and a calm, hotel-quality bedroom.', highlights: ['Walking distance to the city centre', 'Smart TV and fast broadband', 'Self check-in with 24/7 support'] },
  { name: 'Northern Quarter Suite', location: 'Manchester', image: '1493809842364-78817add7ffb', sample: true, beds: 2, guests: 5, price: '£140',
    blurb: 'A stylish two-bedroom suite in the heart of the city, close to restaurants, offices and transport links. Flexible stays from one night to several months.', highlights: ['Open-plan living and dining', 'Washer-dryer and full kitchen', 'Premium linen and towels'] },
  { name: 'Riverside Court Apartment', location: 'Bristol', image: '1600607687939-ce8a6c25118c', sample: true, beds: 3, guests: 6, price: '£185',
    blurb: 'A spacious three-bedroom home with a private balcony and river views, designed for families and teams who want room to relax.', highlights: ['Private balcony', 'Allocated parking', 'Welcome pack on arrival'] },
]
export const LINKS = { email: 'hello@lyshliving.co.uk', instagram: 'https://www.instagram.com/lyshliving', linkedin: 'https://www.linkedin.com/company/lyshliving' }
