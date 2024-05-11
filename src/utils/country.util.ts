type Country = {
    code: string;
    telephone: string;
    name: string;
    emoji: string;
};

export class CountryUtil {
    private static countryCodes: Country[] = [
        { code: 'US', telephone: '1', name: 'United States', emoji: '🇺🇸' },
        { code: 'GB', telephone: '44', name: 'United Kingdom', emoji: '🇬🇧' },
        { code: 'IL', telephone: '972', name: 'Israel', emoji: '🇮🇱' },
        { code: 'DE', telephone: '49', name: 'Germany', emoji: '🇩🇪' },
        { code: 'FR', telephone: '33', name: 'France', emoji: '🇫🇷' },
        { code: 'IT', telephone: '39', name: 'Italy', emoji: '🇮🇹' },
        { code: 'ES', telephone: '34', name: 'Spain', emoji: '🇪🇸' },
        { code: 'RU', telephone: '7', name: 'Russia', emoji: '🇷🇺' },
        { code: 'BR', telephone: '55', name: 'Brazil', emoji: '🇧🇷' },
        { code: 'IN', telephone: '91', name: 'India', emoji: '🇮🇳' },
        { code: 'KR', telephone: '82', name: 'South Korea', emoji: '🇰🇷' },
        { code: 'JP', telephone: '81', name: 'Japan', emoji: '🇯🇵' },
        { code: 'CN', telephone: '86', name: 'China', emoji: '🇨🇳' },
        { code: 'AU', telephone: '61', name: 'Australia', emoji: '🇦🇺' },
        { code: 'CA', telephone: '1', name: 'Canada', emoji: '🇨🇦' },
        { code: 'MX', telephone: '52', name: 'Mexico', emoji: '🇲🇽' },
        { code: 'AR', telephone: '54', name: 'Argentina', emoji: '🇦🇷' },
        { code: 'CL', telephone: '56', name: 'Chile', emoji: '🇨🇱' },
        { code: 'CO', telephone: '57', name: 'Colombia', emoji: '🇨🇴' },
        { code: 'PE', telephone: '51', name: 'Peru', emoji: '🇵🇪' },
        { code: 'VE', telephone: '58', name: 'Venezuela', emoji: '🇻🇪' },
        { code: 'ZA', telephone: '27', name: 'South Africa', emoji: '🇿🇦' },
        { code: 'NG', telephone: '234', name: 'Nigeria', emoji: '🇳🇬' },
        { code: 'EG', telephone: '20', name: 'Egypt', emoji: '🇪🇬' },
        { code: 'SA', telephone: '966', name: 'Saudi Arabia', emoji: '🇸🇦' },
        { code: 'AE', telephone: '971', name: 'United Arab Emirates', emoji: '🇦🇪' },
        { code: 'TR', telephone: '90', name: 'Turkey', emoji: '🇹🇷' },
        { code: 'PK', telephone: '92', name: 'Pakistan', emoji: '🇵🇰' },
        { code: 'ID', telephone: '62', name: 'Indonesia', emoji: '🇮🇩' },
        { code: 'PH', telephone: '63', name: 'Philippines', emoji: '🇵🇭' },
        { code: 'MY', telephone: '60', name: 'Malaysia', emoji: '🇲🇾' },
        { code: 'TH', telephone: '66', name: 'Thailand', emoji: '🇹🇭' },
        { code: 'VN', telephone: '84', name: 'Vietnam', emoji: '🇻🇳' },
        { code: 'SG', telephone: '65', name: 'Singapore', emoji: '🇸🇬' },
        { code: 'HK', telephone: '852', name: 'Hong Kong', emoji: '🇭🇰' },
        { code: 'TW', telephone: '886', name: 'Taiwan', emoji: '🇹🇼' },
        { code: 'NZ', telephone: '64', name: 'New Zealand', emoji: '🇳🇿' },
        { code: 'FI', telephone: '358', name: 'Finland', emoji: '🇫🇮' },
        { code: 'SE', telephone: '46', name: 'Sweden', emoji: '🇸🇪' },
        { code: 'NO', telephone: '47', name: 'Norway', emoji: '🇳🇴' },
        { code: 'DK', telephone: '45', name: 'Denmark', emoji: '🇩🇰' },
        { code: 'PL', telephone: '48', name: 'Poland', emoji: '🇵🇱' },
        { code: 'NL', telephone: '31', name: 'Netherlands', emoji: '🇳🇱' },
        { code: 'BE', telephone: '32', name: 'Belgium', emoji: '🇧🇪' },
        { code: 'AT', telephone: '43', name: 'Austria', emoji: '🇦🇹' },
        { code: 'CH', telephone: '41', name: 'Switzerland', emoji: '🇨🇭' },
        { code: 'CZ', telephone: '420', name: 'Czech Republic', emoji: '🇨🇿' },
        { code: 'GR', telephone: '30', name: 'Greece', emoji: '🇬🇷' },
        { code: 'PT', telephone: '351', name: 'Portugal', emoji: '🇵🇹' },
        { code: 'HU', telephone: '36', name: 'Hungary', emoji: '🇭🇺' },
        { code: 'IE', telephone: '353', name: 'Ireland', emoji: '🇮🇪' },
        { code: 'RO', telephone: '40', name: 'Romania', emoji: '🇷🇴' },
        { code: 'UA', telephone: '380', name: 'Ukraine', emoji: '🇺🇦' },
        { code: 'RS', telephone: '381', name: 'Serbia', emoji: '🇷🇸' },
        { code: 'HR', telephone: '385', name: 'Croatia', emoji: '🇭🇷' },
        { code: 'BG', telephone: '359', name: 'Bulgaria', emoji: '🇧🇬' },
        { code: 'SI', telephone: '386', name: 'Slovenia', emoji: '🇸🇮' },
        { code: 'SK', telephone: '421', name: 'Slovakia', emoji: '🇸🇰' },
        { code: 'LT', telephone: '370', name: 'Lithuania', emoji: '🇱🇹' },
        { code: 'LV', telephone: '371', name: 'Latvia', emoji: '🇱🇻' },
        { code: 'EE', telephone: '372', name: 'Estonia', emoji: '🇪🇪' },
        { code: 'MD', telephone: '373', name: 'Moldova', emoji: '🇲🇩' },
        { code: 'BY', telephone: '375', name: 'Belarus', emoji: '🇧🇾' },
        { code: 'AM', telephone: '374', name: 'Armenia', emoji: '🇦🇲' },
        { code: 'AZ', telephone: '994', name: 'Azerbaijan', emoji: '🇦🇿' },
        { code: 'GE', telephone: '995', name: 'Georgia', emoji: '🇬🇪' },
        { code: 'KG', telephone: '996', name: 'Kyrgyzstan', emoji: '🇰🇬' },
        { code: 'UZ', telephone: '998', name: 'Uzbekistan', emoji: '🇺🇿' },
        { code: 'TM', telephone: '993', name: 'Turkmenistan', emoji: '🇹🇲' },
        { code: 'TJ', telephone: '992', name: 'Tajikistan', emoji: '🇹🇯' },
        { code: 'KZ', telephone: '7', name: 'Kazakhstan', emoji: '🇰🇿' },
        { code: 'IR', telephone: '98', name: 'Iran', emoji: '🇮🇷' },
        { code: 'IQ', telephone: '964', name: 'Iraq', emoji: '🇮🇶' },
        { code: 'SY', telephone: '963', name: 'Syria', emoji: '🇸🇾' },
        { code: 'YE', telephone: '967', name: 'Yemen', emoji: '🇾🇪' },
        { code: 'OM', telephone: '968', name: 'Oman', emoji: '🇴🇲' },
    ];

    /**
     * Get country flag by country code
     * @param countryCode
     */
    static getFlagByCode(countryCode: string): string | undefined {
        const countryInfo = this.countryCodes.find((country) => country.code === countryCode);
        return countryInfo ? countryInfo.emoji : undefined;
    }

    /**
     * Get country name by country code
     * @param countryCode
     */
    static getNameByCode(countryCode: string): string | undefined {
        const countryInfo = this.countryCodes.find((country) => country.code === countryCode);
        return countryInfo ? countryInfo.name : undefined;
    }

    /**
     * Get country telephone code by country code
     * @param countryCode
     */
    static getTelephoneByCode(countryCode: string): string | undefined {
        const countryInfo = this.countryCodes.find((country) => country.code === countryCode);
        return countryInfo ? countryInfo.telephone : undefined;
    }

    /**
     * Get country emoji by country code
     * @param countryCode
     */
    static getEmojiByCode(countryCode: string): string | undefined {
        const countryInfo = this.countryCodes.find((country) => country.code === countryCode);
        return countryInfo ? countryInfo.emoji : undefined;
    }

    /**
     * Get country code by country name
     * @param countryName
     */
    static getCodeByName(countryName: string): string | undefined {
        const countryInfo = this.countryCodes.find((country) => country.name === countryName);
        return countryInfo ? countryInfo.code : undefined;
    }

    /**
     * Get country telephone code by country name
     * @param countryName
     */
    static getTelephoneByName(countryName: string): string | undefined {
        const countryInfo = this.countryCodes.find((country) => country.name === countryName);
        return countryInfo ? countryInfo.telephone : undefined;
    }

    /**
     * Get country emoji by country name
     * @param countryName
     */
    static getEmojiByName(countryName: string): string | undefined {
        const countryInfo = this.countryCodes.find((country) => country.name === countryName);
        return countryInfo ? countryInfo.emoji : undefined;
    }

    /**
     * Get country code by country telephone code
     * @param countryTelephone
     */
    static getCodeByTelephone(countryTelephone: string): string | undefined {
        const countryInfo = this.countryCodes.find((country) => country.telephone === countryTelephone);
        return countryInfo ? countryInfo.code : undefined;
    }

    /**
     * Get country name by country telephone code
     * @param countryTelephone
     */
    static getNameByTelephone(countryTelephone: string): string | undefined {
        const countryInfo = this.countryCodes.find((country) => country.telephone === countryTelephone);
        return countryInfo ? countryInfo.name : undefined;
    }

    /**
     * Get country emoji by country telephone code
     * @param countryTelephone
     */
    static getEmojiByTelephone(countryTelephone: string): string | undefined {
        const countryInfo = this.countryCodes.find((country) => country.telephone === countryTelephone);
        return countryInfo ? countryInfo.emoji : undefined;
    }

    /**
     * Get all country codes
     */
    static getCodes(): string[] {
        return this.countryCodes.map((country) => country.code);
    }
}
