package com.efakin.springcms.config;

import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Configuration

public class HibernateSearchIndexBuild implements ApplicationListener<ApplicationReadyEvent> {


    @Autowired

    private EntityManager entityManager;

    @Override

    @Transactional

    public void onApplicationEvent(ApplicationReadyEvent event) {

        SearchSession searchSession = Search.session(entityManager);
        MassIndexer indexer = searchSession.massIndexer();
        try {
            indexer.startAndWait();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

    }

}