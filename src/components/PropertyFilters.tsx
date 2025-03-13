
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PropertyFilter } from '@/lib/types';
import { propertyTypes, propertyAmenities } from '@/lib/data';
import { X, SlidersHorizontal, Home, DollarSign, Bed, Bath } from 'lucide-react';

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilter) => void;
}

const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | undefined>(undefined);
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | undefined>(undefined);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [listingType, setListingType] = useState<'Sale' | 'Rent' | 'All'>('All');
  
  const filterPanelRef = useRef<HTMLDivElement>(null);

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      bedrooms: selectedBedrooms,
      bathrooms: selectedBathrooms,
      propertyType: selectedPropertyTypes.length > 0 ? selectedPropertyTypes : undefined,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
      listingType,
    });
    
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const resetFilters = () => {
    setPriceRange([0, 2000000]);
    setSelectedBedrooms(undefined);
    setSelectedBathrooms(undefined);
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
    setListingType('All');
    
    onFilterChange({});
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        filterPanelRef.current &&
        !filterPanelRef.current.contains(event.target as Node) &&
        window.innerWidth < 768
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 py-5"
          onClick={() => setIsOpen(true)}
        >
          <SlidersHorizontal size={16} />
          <span>Filters</span>
        </Button>
      </div>

      {/* Filter Panel */}
      <div 
        ref={filterPanelRef}
        className={`
          fixed md:relative top-0 bottom-0 left-0 z-40
          w-full md:w-auto h-full md:h-auto
          bg-white md:bg-transparent
          overflow-auto
          transition-transform duration-300 ease-out-expo
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="md:hidden flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)}
            className="rounded-full"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="p-5 space-y-6">
          {/* Listing Type */}
          <div>
            <Label className="text-base font-medium mb-3 block">Listing Type</Label>
            <div className="flex gap-3">
              <Button
                variant={listingType === 'All' ? 'default' : 'outline'}
                className="flex-1 rounded-full"
                onClick={() => setListingType('All')}
              >
                All
              </Button>
              <Button
                variant={listingType === 'Sale' ? 'default' : 'outline'}
                className="flex-1 rounded-full"
                onClick={() => setListingType('Sale')}
              >
                For Sale
              </Button>
              <Button
                variant={listingType === 'Rent' ? 'default' : 'outline'}
                className="flex-1 rounded-full"
                onClick={() => setListingType('Rent')}
              >
                For Rent
              </Button>
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base font-medium">Price Range</Label>
              <div className="flex items-center text-sm text-estate-600">
                <DollarSign size={14} className="inline" />
                <span>{priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            <Slider
              defaultValue={[0, 2000000]}
              max={2000000}
              step={50000}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceRangeChange}
              className="my-5"
            />
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="min-price" className="text-sm text-estate-500">Min</Label>
                <Input
                  id="min-price"
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="max-price" className="text-sm text-estate-500">Max</Label>
                <Input
                  id="max-price"
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bedrooms" className="text-base font-medium mb-2 block">Bedrooms</Label>
              <Select
                value={selectedBedrooms?.toString() || ''}
                onValueChange={(value) => setSelectedBedrooms(value ? Number(value) : undefined)}
              >
                <SelectTrigger id="bedrooms" className="w-full">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}+
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bathrooms" className="text-base font-medium mb-2 block">Bathrooms</Label>
              <Select
                value={selectedBathrooms?.toString() || ''}
                onValueChange={(value) => setSelectedBathrooms(value ? Number(value) : undefined)}
              >
                <SelectTrigger id="bathrooms" className="w-full">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}+
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Property Type */}
          <div>
            <Label className="text-base font-medium mb-3 block">Property Type</Label>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <Badge
                  key={type}
                  variant={selectedPropertyTypes.includes(type) ? 'default' : 'outline'}
                  className={`rounded-full cursor-pointer ${
                    selectedPropertyTypes.includes(type)
                      ? 'bg-primary hover:bg-primary/90'
                      : 'hover:bg-estate-50'
                  }`}
                  onClick={() => togglePropertyType(type)}
                >
                  <Home size={14} className="mr-1" />
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div>
            <Label className="text-base font-medium mb-3 block">Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              {propertyAmenities.slice(0, 8).map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <Label
                    htmlFor={`amenity-${amenity}`}
                    className="text-sm cursor-pointer"
                  >
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 sticky bottom-0 bg-white md:relative">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={resetFilters}
            >
              Reset
            </Button>
            <Button 
              className="flex-1"
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyFilters;
