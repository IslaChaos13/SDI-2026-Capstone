/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */



exports.seed = function(knex) {
  return knex('directory')
    .del()
    .then(function () {
      return knex('directory').insert([
        {
          title: '2nd Medical Group',
          link: 'https://www.barksdale.af.mil/Units/2nd-Medical-Group/',
          phone: '318-456-6555',
          address: "243 Curtiss Rd, Suite 100, Barksdale AFB, LA 71110",
          latitude: 32.491190287142885,
          longitude: -93.68164572209265
        },
        {
          title: 'Barksdale Finance',
          link: 'https://www.barksdale.af.mil/Units/2CPTS/',
          phone: '318-456-4333',
          address: '801 Kenny Ave. Suite 1400 Barksdale AFB, LA 71110-242',
          latitude: 32.49422120709173,
          longitude: -93.67803965800223
        },
        {
          title: 'Deers & Ids',
          link: 'https://barksdalelife.com/military-personnel-flight/',
          phone: '318-456-3710',
          address: '801 Kenney Ave, Suite 1300, Barksdale AFB, LA 71110',
          latitude: 32.49477321050606,
          longitude: -93.67818984618603
        },
        {
          title: 'Military and Family Readiness',
          link: 'https://barksdalelife.com/military-and-family-readiness/?_gl=1*1vx21ft*_up*MQ..*_ga*MTI2Mjk3MjMzOC4xNzgzOTU3OTIy*_ga_MR0WKQ05YN*czE3ODM5NTc5MjEkbzEkZzAkdDE3ODM5NTc5MjEkajYwJGwwJGgw',
          phone: '318.456.8400',
          address:'801 Kenney Ave, Suite 1400, Barksdale AFB, LA 71110',
          latitude: 32.49469176289784,
          longitude: -93.67795381251982
        }
      ]);
    });
};