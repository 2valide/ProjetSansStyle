FROM php:8.2-apache

RUN docker-php-ext-install pdo pdo_mysql

COPY ./public /var/www/html/public
#COPY ./api /var/www/html/api

WORKDIR /var/www/html

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80
