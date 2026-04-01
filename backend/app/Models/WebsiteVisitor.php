<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebsiteVisitor extends Model
{
    protected $fillable = [
        'ip_address',
        'user_agent',
        'page',
    ];

    /**
     * Parse the raw User-Agent string into a readable 'Device / OS' string.
     */
    public function getDeviceAttribute(): string
    {
        $ua = $this->user_agent ?? '';
        if (empty($ua)) {
            return 'Unknown Device';
        }

        $browser = 'Unknown Browser';
        if (stripos($ua, 'Edge') !== false || stripos($ua, 'Edg/') !== false) $browser = 'Edge';
        elseif (stripos($ua, 'Chrome') !== false) $browser = 'Chrome';
        elseif (stripos($ua, 'Safari') !== false) $browser = 'Safari';
        elseif (stripos($ua, 'Firefox') !== false) $browser = 'Firefox';
        elseif (stripos($ua, 'Opera') !== false || stripos($ua, 'OPR/') !== false) $browser = 'Opera';

        $os = 'Unknown OS';
        if (stripos($ua, 'Windows NT 10.0') !== false) $os = 'Windows 10/11';
        elseif (stripos($ua, 'Windows') !== false) $os = 'Windows';
        elseif (stripos($ua, 'Mac OS X') !== false) $os = 'macOS';
        elseif (stripos($ua, 'Linux') !== false) $os = 'Linux';
        elseif (stripos($ua, 'Android') !== false) $os = 'Android';
        elseif (stripos($ua, 'iPhone') !== false || stripos($ua, 'iPad') !== false) $os = 'iOS';

        return "{$browser} on {$os}";
    }

    /**
     * Create a consistent, shortened alias like 'User 9F8A' from an IP address
     * so behavior can be tracked visually without keeping raw IPs in mind.
     */
    public function getVisitorIdAttribute(): string
    {
        if (empty($this->ip_address)) {
            return 'Unknown User';
        }
        
        $hash = strtoupper(substr(md5($this->ip_address), 0, 4));
        return "User {$hash}";
    }
}
