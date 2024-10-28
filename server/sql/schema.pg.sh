echo -n "you are running $0 type yes to continue: "
read -r answer
[ "$answer" != "yes" ] && exit

cat schema.pg.sql | sudo -u postgres psql