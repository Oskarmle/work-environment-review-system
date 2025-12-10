FROM quay.io/keycloak/keycloak:26.4.7

# Render configuration
ENV KC_HTTP_ENABLED=true
ENV KC_HTTP_PORT=8080
ENV KC_PROXY_HEADERS=xforwarded
ENV KC_HOSTNAME_STRICT=false
ENV KC_HOSTNAME_STRICT_HTTPS=false

ENV KC_DB=postgres
ENV KC_HEALTH_ENABLED=true

ENV KC_CACHE=local
ENV KC_CACHE_STACK=local

EXPOSE 8080

RUN /opt/keycloak/bin/kc.sh build --cache=local

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start", "--optimized", "--http-enabled=true", "--http-port=8080", "--hostname-strict=false"]