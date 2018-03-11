qz.security.setCertificatePromise(function(resolve, reject) {
        // Preferred method - from server
//        $.ajax("assets/signing/digital-certificate.txt").then(resolve, reject);

        // Alternate method 1 - anonymous
//        resolve();
        // Alternate method 2 - direct
        resolve('-----BEGIN CERTIFICATE-----\n' +
                'MIIEoTCCA4mgAwIBAgIJANaQTvZ8eMXBMA0GCSqGSIb3DQEBBQUAMIGRMQswCQYDVQQGEwJJTjEPMA0GA1UECBMGT2Rpc2hhMREwDwYDVQQHEwhSb3Vya2VsYTEVMBMGA1UEChMMTGF1bmRyeSBDbHViMREwDwYDVQQLEwhTb2Z0d2FyZTEPMA0GA1UEAxMGQ2hpcmFnMSMwIQYJKoZIhvcNAQkBFhRhLmNoaXJhZ0BvdXRsb29rLmNvbTAeFw0xODAzMDUxNTU5MTJaFw00OTA4MjgxNTU5MTJaMIGRMQswCQYDVQQGEwJJTjEPMA0GA1UECBMGT2Rpc2hhMREwDwYDVQQHEwhSb3Vya2VsYTEVMBMGA1UEChMMTGF1bmRyeSBDbHViMREwDwYDVQQLEwhTb2Z0d2FyZTEPMA0GA1UEAxMGQ2hpcmFnMSMwIQYJKoZIhvcNAQkBFhRhLmNoaXJhZ0BvdXRsb29rLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOPjb143w//Tq0mFXRefB32YrlbE55rQ0INbNee++U60Fny4Sd+ad50Iyic2fs3cAnJpESZ3/+gjN46L9bHxuCEXpzgFnK6q+KxUtreptorZTB0isOpgcFfSFh/N28Uj6jjLfb3+wd1kCDOwY4DG1+ub3FMNvzHiOmMKUyFxIjzQQGMw5pMEoVjK0FEXCdc5M7lzjQnljJrNh1Zk/X507tD744jV+X/dhUWcNCGIz4edkdUqljPQ292y1CrRY0qk4qOU9y0ou2o82VdzuFbUcE9BSC9viooVFXZU2Abob0lta24HFXCCj1MFtVrrs5VDIFK9qU2gitCRh+tWXLqFdV8CAwEAAaOB+TCB9jAdBgNVHQ4EFgQUkYb2RFe/DsTb68CpQpRG+ChL+4EwgcYGA1UdIwSBvjCBu4AUkYb2RFe/DsTb68CpQpRG+ChL+4GhgZekgZQwgZExCzAJBgNVBAYTAklOMQ8wDQYDVQQIEwZPZGlzaGExETAPBgNVBAcTCFJvdXJrZWxhMRUwEwYDVQQKEwxMYXVuZHJ5IENsdWIxETAPBgNVBAsTCFNvZnR3YXJlMQ8wDQYDVQQDEwZDaGlyYWcxIzAhBgkqhkiG9w0BCQEWFGEuY2hpcmFnQG91dGxvb2suY29tggkA1pBO9nx4xcEwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOCAQEAMJ2hu8EOOKOnRgyF8mZDglrmcv/+rVosAjwU4cskwx3rcCuGdGD7k3gX2as7ZmOV6MEayBVH4Hg5Fg9Q8Y78jxYrSUIDil9Yr0BVYUi2KosmA8isAr/rICGWlnwYWTx3dKiEIps18AoiP93TQ1wp5WqM9PxhCof1YXW7LeNa3dbJIdUvCEagYo8UwaOQcnUz7qQlnNSDUKfeUmK4hFwCDGn/myuCHQfpf1HkS2zBbD3rtXmugSF6EKXrbcNtBJMU/O3kgp/55Sd3ITnMzlF3zDtYFuQV480HTOP6pus6LSob/g9W2DPCYeRHPI+1ld+QvscZdvQF62iIz1I+/S0sMQ=='+
                '-----END CERTIFICATE-----\n');
    });
var privateKey ="-----BEGIN RSA PRIVATE KEY-----\n"+
"MIIEowIBAAKCAQEA4+NvXjfD/9OrSYVdF58HfZiuVsTnmtDQg1s15775TrQWfLhJ\n"+
"35p3nQjKJzZ+zdwCcmkRJnf/6CM3jov1sfG4IRenOAWcrqr4rFS2t6m2itlMHSKw\n"+
"6mBwV9IWH83bxSPqOMt9vf7B3WQIM7BjgMbX65vcUw2/MeI6YwpTIXEiPNBAYzDm\n"+
"kwShWMrQURcJ1zkzuXONCeWMms2HVmT9fnTu0PvjiNX5f92FRZw0IYjPh52R1SqW\n"+
"M9Db3bLUKtFjSqTio5T3LSi7ajzZV3O4VtRwT0FIL2+KihUVdlTYBuhvSW1rbgcV\n"+
"cIKPUwW1WuuzlUMgUr2pTaCK0JGH61ZcuoV1XwIDAQABAoIBAD900EkTDC/LeBHD\n"+
"4hU2wjY18q3UrI1OghFhr5P1eKRyvyRBiMiL0azXirr6kLqv/bpwCUeF+KtiSxEV\n"+
"ZfgDz/rfBEA0R9nXX+FUwYBI8LyfH3Opekv5SK8bn++BOiYeBxWDjGMAcmk8dpA2\n"+
"GK7+L5e60dIKrOeuEAYOFPHl99uotwIJ4k0Dz1GGD46SHFE5RSNs8pV4nX8ZaoIj\n"+
"AE8r7tgjnPGJUfHSLwFqaZXC7KqmZZvfeMxA+5orGQLczSYIw2vHtYwx4osVl2zc\n"+
"Don9dtz2UAPh4FzGHxM8czcVRSGJg9OrJwkG5J1cBiTJMJl2M2/5lXYGZHmQdMYd\n"+
"MFHyGrkCgYEA+Njj4e+ivRH9rmadbGW9IxXvA321YniBIut4rHRV0VmtYOwbYHhw\n"+
"UQu8OkpgiK/rQdK99wC+6lTs0+it91qg5WCff1Q2IaR/pUrVJU9lJ7Xm3Eljpqct\n"+
"BpVV1rUojeOCujmaPfrnj2uO2uVNPgTFWdIXIQpTIO8aHzr7mZ3T0q0CgYEA6nBS\n"+
"e/3DqdEHjwSkaqDrbfVXwl6tkBSmdWXk1VKdnvHro3bOm/V7ldb02Y8oWtpKdVlB\n"+
"7Lys6idA+8GAsdsy8v/VDvlnG7c7aFcINwDs8zCIRA5PDbkm4NyKtJBShyTCyn63\n"+
"93SDJIrMnVA3GCRH5QZ+MfeUleM/vY0hXek39bsCgYAtP9soQVf5Q2U6qkQj6tga\n"+
"oillHB24eysYO3MlAL5+I+1n+2b7AsuBoT2n59Bn6n0/6d9LI+KTX7/0xJGlseAh\n"+
"9ZDrKVfyhCQF3XamoypEr0n8cofhTPLeCJekRCrMqjsiO8k1TgN/S9KdMSb7iQiN\n"+
"zasRAfydt3yrgyEvDMjwvQKBgFkIaTrvh7RhTwaQk8Ru8poi175YaH/UZ9cj6EDf\n"+
"jD7Fz2CYCSUPmGyyYvCQvpmqVyazzCaVDPIsEDDMLwzcmz/PyuFR9EeBUc1xaAxD\n"+
"jLla0BVQfdNPYqV4/DBQsxbh7hwq/cC7feaN0+FWimXfuXIQAjMFvGckE5vwEiDx\n"+
"JjBrAoGBANldZR6qI2xACMrdjACgRVtyox6STRgu5Sg5FHmpoqqnpkcNJ1wb8NVb\n"+
"5eCc1zBiSa4ttEGfrYgU6UlgqFhGbKFWi1d9O1wB4lUFWpuSozo6b2tovJCoyCEY\n"+
"IhOqGLoYxf4G6EW+rczUZKJpLihxI8ZLL9c8ftTIn6OKUIYr1DrI\n"+
"-----END RSA PRIVATE KEY-----\n";
qz.security.setSignaturePromise(function(toSign) {
    return function(resolve, reject) {
        try {
            var pk = KEYUTIL.getKey(privateKey);
            var sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});
            sig.init(pk); 
            sig.updateString(toSign);
            var hex = sig.sign();
            console.log("DEBUG: \n\n" + stob64(hextorstr(hex)));
            resolve(stob64(hextorstr(hex)));
        } catch (err) {
            console.error(err);
            reject(err);
        }
    };
});