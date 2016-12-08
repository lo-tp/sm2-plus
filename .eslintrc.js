module.exports = {
  extends: ['airbnb'],
  globals:{
      describe:true,
      it:true,
    },
  parser: 'babel-eslint',
  plugins: [
    'babel',
  ],
  rules:{
      "comma-dangle":[
        2,
        "always-multiline"
      ],
      'consistent-return':0,
      "no-mixed-operators": [0],
      camelcase:0,
    },
};
