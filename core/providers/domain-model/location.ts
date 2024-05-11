export class Location {
    /**
     * Latitude
     */
    private _latitude: number;
    /**
     * Longitude
     */
    private _longitude: number;

    constructor(latitude: number, longitude: number) {
        this._latitude = latitude;
        this._longitude = longitude;
    }

    get latitude(): number {
        return this._latitude;
    }

    get longitude(): number {
        return this._longitude;
    }

    set latitude(value: number) {
        this._latitude = value;
    }

    set longitude(value: number) {
        this._longitude = value;
    }

    /**
     * Get the distance between two locations
     * @param location
     */
    getDistance(location: Location): number {
        const EARTH_RADIUS = 6371e3; // meters
        const latitude1Rad = this._latitude * (Math.PI / 180);
        const latitude2Rad = location.latitude * (Math.PI / 180);
        const deltaLatitudeRad = (location.latitude - this._latitude) * (Math.PI / 180);
        const deltaLongitudeRad = (location.longitude - this._longitude) * (Math.PI / 180);

        const a =
            Math.sin(deltaLatitudeRad / 2) * Math.sin(deltaLatitudeRad / 2) +
            Math.cos(latitude1Rad) *
                Math.cos(latitude2Rad) *
                Math.sin(deltaLongitudeRad / 2) *
                Math.sin(deltaLongitudeRad / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;
    }
}
