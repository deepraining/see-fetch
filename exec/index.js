
module.exports = seeFetch => {

    seeFetch.set({
        errorField: 'hasError'
    });

    seeFetch.config({
        test: {
            method: [
                void 0,
                'post'
            ],
            stringify: [
                void 0,
                true
            ],
            settings: [
                {
                    headers: {
                        haha: 'hehe'
                    }
                }
            ],
            url: [
                "/data/a.json",
                "/data/b.json"
                // "/data/c.html"
            ],
            requestKeys: [
                void 0,
                {
                    key1: 'keyb'
                }
            ],
            responseRefactor: [
                {
                    data: [
                        {
                            newId: 'id',
                            images: 'pics',
                            _images: [
                                {
                                    newId: 'id',
                                    newSrc: 'src'
                                }
                            ]
                        }
                    ]
                },
                {
                    data: [
                        {
                            images: [
                                {
                                    newId: 'id',
                                    newSrc: 'src'
                                }
                            ]
                        }
                    ]
                }
            ],
            preHandle: [
                function (req) {
                    req.test = 0
                },
                function (req) {
                    req.test = 1
                }
            ],
            postHandle: [
                function (res, req) {
                    res.test = 0;
                    console.log('req:');
                    console.log(req);
                },
                function (res, req) {
                    res.test = 1;
                    console.log('req:');
                    console.log(req);
                }
            ]
        },
        common: {
            responseRefactor: [
                {
                    success: 'result|bool'
                },
                {
                    success: 'result|bool'
                }
            ],
            preHandle: [
                function (req) {
                    req.common = 0
                },
                function (req) {
                    req.common = 1
                }
            ],
            postHandle: [
                function (res, req) {
                    res.common = 0;
                },
                function (res, req) {
                    res.common = 1;
                }
            ]
        }
    });

    seeFetch.setEnv(0);

    seeFetch('test', {key1: 'haha'})
        .then(res => {
            if (res.hasError) {
                console.log('error', res.response);
            }

            console.log('env: 0');
            console.log(res);

            seeFetch.setEnv(1);
            seeFetch('test', {key1: 'haha'})
                .then(res => {
                    if (res.hasError) {
                        console.log('error', res.response);
                    }

                    console.log('env: 1');
                    console.log(res);

                    makeTest2();
                });
        });

    function makeTest2() {
        seeFetch.config({
            test2: {
                method: [
                    'put',
                    'delete'
                ],
                url: [
                    "/data/a.json",
                    "/data/b.json"
                ],
                requestKeys: [
                    {
                        key1: 'keya'
                    }
                ],
                responseRefactor: [
                    {
                        data: [
                            {
                                newId: 'id',
                                images: 'pics',
                                _images: [
                                    {
                                        newId: 'id',
                                        newSrc: 'src'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        data: [
                            {
                                images: [
                                    {
                                        newId: 'id',
                                        newSrc: 'src'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                preHandle: [
                    function (req) {
                        req.test2 = 0
                    },
                    function (req) {
                        req.test2 = 1
                    }
                ],
                postHandle: [
                    function (res, req) {
                        res.test2 = 0;
                        console.log('req:');
                        console.log(req);
                    },
                    function (res, req) {
                        res.test2 = 1;
                        console.log('req:');
                        console.log(req);
                    }
                ]
            },
            common: {
                responseRefactor: [
                    {
                        success: 'result|bool'
                    },
                    {
                        success: 'result|bool'
                    }
                ],
                preHandle: [
                    function (req) {
                        req.common2 = 0
                    },
                    function (req) {
                        req.common2 = 1
                    }
                ],
                postHandle: [
                    function (res) {
                        res.common2 = 0
                    },
                    function (res) {
                        res.common2 = 1
                    }
                ]
            }
        });
        seeFetch.setEnv(0);

        seeFetch('test2', {key1: 'haha'})
            .then(res => {
                if (res.hasError) {
                    console.log('error', res.response);
                }

                console.log('env: 0');
                console.log(res);

                seeFetch.setEnv(1);
                seeFetch('test2', {key1: 'haha'})
                    .then(res => {
                        if (res.hasError) {
                            console.log('error', res.response);
                        }

                        console.log('env: 1');
                        console.log(res);
                    });
            });
    }
};
