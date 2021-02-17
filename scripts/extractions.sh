#!/bin/bash

#!/bin/bash
# chmod +x /Users/jairson/github/bbl/scripts/extractions.sh
# /Users/jairson/github/bbl/scripts/extractions.sh

# liste des tables
# amenity
# tourism
# leisure
# public_transport
# railway
# highway
# aeroway
# harbour
# schoolfr
# shop
# emergency
# healthcare
# information
# addr:postcode
# postal_code


# folder
cd /Volumes/Taranaki/;
zone="europe";

## declare an array variable
declare -a arr=("postal_code")

## now loop through the above array
for tag in "${arr[@]}"
do
osmium tags-filter $zone-latest.osm.pbf /$tag --overwrite -o $tag.osm.pbf;
#osm2pgsql -d visualizemap -U postgres -P 5432 -C 6000 -p $tag -E 4326 -j -x -G $tag.osm.pbf;
#osm2pgsql -d postgres -U postgres -P 5432 -C 6000 -p postal_code -E 4326 -j -x -G /Volumes/Taranaki/postal_code.osm.pbf;

done


